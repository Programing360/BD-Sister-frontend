import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false),
});

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters")
      .max(70, "Name cannot exceed 70 characters"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[0-9]/, "Password must include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms of Service & Sisterhood Guidelines",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[0-9]/, "Password must include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

async function runTestSuite() {
  console.log("===============================================================");
  console.log("   BDSisters.org - Comprehensive Authentication Test Suite     ");
  console.log("===============================================================\n");

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  function assert(condition, testName, details = "") {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✅ PASS: ${testName}`);
    } else {
      failedTests++;
      console.error(`  ❌ FAIL: ${testName} ${details ? `(${details})` : ""}`);
    }
  }

  // 1. Client Schema Validation Tests
  console.log("--- 1. Validation & Schema Enforcement ---");

  const invalidEmailResult = registerSchema.safeParse({
    fullName: "Sister Ayesha",
    email: "invalid-email-format",
    password: "Password123!",
    confirmPassword: "Password123!",
    agreeToTerms: true,
  });
  assert(!invalidEmailResult.success, "Registration rejects invalid email format");

  const weakPasswordResult = registerSchema.safeParse({
    fullName: "Sister Ayesha",
    email: "ayesha@example.com",
    password: "short",
    confirmPassword: "short",
    agreeToTerms: true,
  });
  assert(!weakPasswordResult.success, "Registration rejects short password (< 8 chars)");

  const mismatchResult = registerSchema.safeParse({
    fullName: "Sister Ayesha",
    email: "ayesha@example.com",
    password: "Password123!",
    confirmPassword: "DifferentPassword123!",
    agreeToTerms: true,
  });
  assert(!mismatchResult.success, "Registration rejects mismatched passwords");

  const termsResult = registerSchema.safeParse({
    fullName: "Sister Ayesha",
    email: "ayesha@example.com",
    password: "Password123!",
    confirmPassword: "Password123!",
    agreeToTerms: false,
  });
  assert(!termsResult.success, "Registration rejects unaccepted terms");

  const validRegisterResult = registerSchema.safeParse({
    fullName: "Sister Ayesha",
    email: "ayesha@example.com",
    password: "SecurePassword123!",
    confirmPassword: "SecurePassword123!",
    agreeToTerms: true,
  });
  assert(validRegisterResult.success, "Registration accepts valid input data");

  const emptyLogin = loginSchema.safeParse({ email: "", password: "" });
  assert(!emptyLogin.success, "Login rejects empty fields");

  const resetMismatch = resetPasswordSchema.safeParse({
    password: "Password123!",
    confirmPassword: "WrongPassword123!",
  });
  assert(!resetMismatch.success, "Password reset rejects mismatched confirmation");

  // 2. Database & Live Better Auth Server Integration Tests
  console.log("\n--- 2. Database & Server Integration ---");

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("Missing MONGO_URI");
    process.exit(1);
  }

  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db("bd_sister");
  assert(Boolean(db), "MongoDB Atlas database connected successfully");

  let recordedResetToken = null;
  let recordedVerifyToken = null;

  const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    secret: process.env.BETTER_AUTH_SECRET || "bdsisters-temporary-secret-key-32-chars-long",
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      resetPasswordTokenExpiresIn: 3600,
      async sendResetPassword(data) {
        recordedResetToken = data.token;
        console.log(
          `     [Email Simulated] Password reset token dispatched for ${data.user.email}`
        );
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      expiresIn: 86400,
      async sendVerificationEmail(data) {
        recordedVerifyToken = data.token;
        console.log(`     [Email Simulated] Verification email dispatched for ${data.user.email}`);
      },
    },
    user: {
      additionalFields: {
        role: { type: "string", defaultValue: "member" },
      },
    },
    advanced: {
      cookiePrefix: "bdsisters",
    },
  });

  const testEmail = `test.sister.${Date.now()}@bdsisters.test`;
  const testPassword = "StrongSecret123!";
  const testName = "Test Sister Fatima";

  try {
    // A. Registration (signUpEmail)
    console.log(`\nTesting user registration: ${testEmail}`);
    const signUpRes = await auth.api.signUpEmail({
      body: {
        email: testEmail,
        password: testPassword,
        name: testName,
      },
    });

    assert(Boolean(signUpRes?.user?.id), "Registration produces valid user ID");
    assert(signUpRes?.user?.email === testEmail, "Created user email matches input");
    assert(signUpRes?.user?.name === testName, "Created user name matches input");

    // Verify user document in MongoDB Atlas
    const userDoc = await db.collection("user").findOne({ email: testEmail });
    assert(Boolean(userDoc), "User record physically persisted in MongoDB 'user' collection");
    assert(userDoc?.role === "member", "User record automatically assigned default role 'member'");

    // Verify password is NOT stored in plain text
    const accountDoc = await db.collection("account").findOne({
      $or: [{ userId: userDoc._id }, { accountId: userDoc._id?.toString() }],
    });
    assert(
      Boolean(accountDoc?.password),
      "Account credential record created in MongoDB 'account' collection"
    );
    assert(
      accountDoc?.password !== testPassword,
      "Password stored cryptographically hashed (never plaintext)"
    );

    // B. Duplicate Email Protection
    console.log("Testing duplicate registration rejection...");
    try {
      await auth.api.signUpEmail({
        body: {
          email: testEmail,
          password: testPassword,
          name: "Duplicate Sister",
        },
      });
      assert(false, "Duplicate email registration was not rejected");
    } catch {
      assert(true, "Duplicate email registration correctly rejected by Better Auth");
    }

    // C. Login: Incorrect Password
    console.log("Testing sign-in with incorrect password...");
    try {
      await auth.api.signInEmail({
        body: {
          email: testEmail,
          password: "WrongPassword999!",
        },
      });
      assert(false, "Sign-in with wrong password was not rejected");
    } catch {
      assert(true, "Sign-in with wrong password rejected");
    }

    // D. Login: Unknown Email
    console.log("Testing sign-in with unknown email...");
    try {
      await auth.api.signInEmail({
        body: {
          email: "unknown.sister.nonexistent@bdsisters.test",
          password: testPassword,
        },
      });
      assert(false, "Sign-in with non-existent email was not rejected");
    } catch {
      assert(true, "Sign-in with non-existent email rejected");
    }

    // E. Login: Valid Credentials
    console.log("Testing sign-in with valid credentials...");
    const signInRes = await auth.api.signInEmail({
      body: {
        email: testEmail,
        password: testPassword,
      },
    });

    assert(Boolean(signInRes?.user), "Sign-in returns authenticated user payload");
    assert(Boolean(signInRes?.token), "Sign-in generates active session token");

    // F. Session Persistence in MongoDB
    if (signInRes?.token) {
      const sessionDoc = await db.collection("session").findOne({ token: signInRes.token });
      assert(
        Boolean(sessionDoc),
        "Session persisted in MongoDB 'session' collection with expiration"
      );
      assert(
        new Date(sessionDoc.expiresAt) > new Date(),
        "Session expiration date is in the future"
      );
    }

    // G. Password Reset Flow
    console.log("Testing password reset flow...");
    const resetReq = await auth.api.requestPasswordReset({
      body: {
        email: testEmail,
        redirectTo: "http://localhost:3000/reset-password",
      },
    });
    assert(Boolean(resetReq?.status), "Password reset request accepted by server");
    assert(
      Boolean(recordedResetToken),
      "Password reset token successfully generated and dispatched"
    );

    if (recordedResetToken) {
      const updatedPassword = "FreshUpdatedPassword999!";
      const resetRes = await auth.api.resetPassword({
        body: {
          newPassword: updatedPassword,
          token: recordedResetToken,
        },
      });
      assert(Boolean(resetRes?.status), "Password reset completed successfully using valid token");

      // Verify sign in with new password
      const reSignIn = await auth.api.signInEmail({
        body: {
          email: testEmail,
          password: updatedPassword,
        },
      });
      assert(Boolean(reSignIn?.user), "Sign-in succeeds with new password after reset");
    }

    // H. Email Verification Flow
    console.log("Testing email verification flow...");
    assert(Boolean(recordedVerifyToken), "Verification token dispatched during signup");
    if (recordedVerifyToken) {
      const verifyRes = await auth.api.verifyEmail({
        query: {
          token: recordedVerifyToken,
        },
      });
      assert(
        Boolean(verifyRes?.status || verifyRes?.user),
        "Email verification succeeds with valid token"
      );

      // Verify emailVerified status updated in MongoDB
      const verifiedUser = await db.collection("user").findOne({ email: testEmail });
      assert(verifiedUser?.emailVerified === true, "User emailVerified updated to true in MongoDB");
    }

    // I. Cleanup test data from MongoDB Atlas
    console.log("\nCleaning up test fixtures from MongoDB Atlas...");
    await db.collection("user").deleteMany({ email: testEmail });
    await db.collection("account").deleteMany({ accountId: testEmail });
    await db.collection("session").deleteMany({ userId: userDoc?._id || userDoc?.id });
    await db
      .collection("verification")
      .deleteMany({ identifier: { $regex: new RegExp(testEmail, "i") } });
    console.log("Cleanup completed.");
  } catch (err) {
    console.error("Test execution error:", err);
    failedTests++;
  }

  console.log("\n===============================================================");
  console.log(`TOTAL TESTS: ${totalTests}`);
  console.log(`PASSED:      ${passedTests}`);
  console.log(`FAILED:      ${failedTests}`);
  console.log("===============================================================\n");

  await client.close();
  process.exit(failedTests > 0 ? 1 : 0);
}

runTestSuite();

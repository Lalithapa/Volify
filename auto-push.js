import { execSync } from "child_process";

try {
  // اضافه کردن همه تغییرات
  execSync("git add .", { stdio: "inherit" });

  // ساخت پیام کامیت خودکار با تاریخ
  const message = `Auto commit: ${new Date().toLocaleString()}`;
  execSync(`git commit -m "${message}"`, { stdio: "inherit" });

  // پوش کردن به شاخه‌ی اصلی (main)
  execSync("git push origin main", { stdio: "inherit" });

  console.log("✅ Changes committed and pushed successfully!");
} catch (error) {
  console.error("❌ Error during auto push:", error.message);
}

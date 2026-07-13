import { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "vibetrading.fun 的隐私政策。",
};

export default function PrivacyPageZh() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        隐私政策
      </h1>
      <div className="prose prose-invert mt-8 max-w-none">
        <p>
          vibetrading.fun 尊重你的隐私。本政策说明我们收集哪些信息以及如何使用这些信息。
        </p>
        <h2>我们收集的信息</h2>
        <p>
          当你订阅我们的通讯或下载入门套件时，我们会收集你的电子邮件地址。我们还可能通过分析工具收集匿名的使用数据。
        </p>
        <h2>我们如何使用你的信息</h2>
        <p>
          我们使用你的电子邮件发送你请求的资源以及偶尔的更新。我们不会将你的电子邮件地址出售给第三方。
        </p>
        <h2>Cookie</h2>
        <p>
          我们可能使用 Cookie 来改善你的体验并分析网站使用情况。你可以在浏览器设置中禁用 Cookie。
        </p>
        <h2>联系我们</h2>
        <p>
          如果你对本隐私政策有任何疑问，请联系我们。
        </p>
      </div>
    </div>
  );
}

import { Bot, InlineKeyboard } from "grammy";

const token = process.env.BOT_TOKEN;
const ownerId = process.env.OWNER_ID;

if (!token) {
  console.error("خطأ: لم يتم ضبط BOT_TOKEN في متغيرات البيئة!");
  process.exit(1);
}

const bot = new Bot(token);

// أزرار تفاعلية
const mainKeyboard = new InlineKeyboard()
  .text("✨ من نحن", "about")
  .text("📦 الخدمات", "services")
  .row()
  .text("📞 تواصل معنا", "contact");

// أمر /start
bot.command("start", async (ctx) => {
  await ctx.reply(`أهلاً بك يا ${ctx.from.first_name} في البوت! 🚀\nاستخدم الأزرار أدناه للتنقل:`, {
    reply_markup: mainKeyboard,
  });
});

// أمر /id
bot.command("id", async (ctx) => {
  await ctx.reply(`معرّفك (ID): \`${ctx.from.id}\``, { parse_mode: "MarkdownV2" });
});

// أمر /panel (لوحة المالك)
bot.command("panel", async (ctx) => {
  const senderId = String(ctx.from.id).trim();
  const configuredOwner = String(ownerId || "").trim();

  if (configuredOwner && senderId === configuredOwner) {
    await ctx.reply("⚙️ أهلاً بك في لوحة تحكم المالك الرئيسية!");
  } else {
    await ctx.reply("⚠️ هذا الأمر مخصص لمالك البوت فقط.");
  }
});

// التفاعل مع الأزرار
bot.callbackQuery("about", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("ℹ️ نحن نقدم أفضل الخدمات وإدارة البوتات.");
});

bot.callbackQuery("services", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("📦 خدماتنا تشمل:\n1. تصميم بوتات\n2. إدارة المجموعات");
});

bot.callbackQuery("contact", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("📞 يمكنك التواصل معنا عبر المالك مباشرة.");
});

bot.start();
console.log("تم تشغيل البوت بنجاح...");

export default {
  async fetch(request) {
    if (request.method === "POST") {
      const update = await request.json();
      const chatId = update.message?.chat.id;
      const messageText = update.message?.text || "";
      const userName = update.message?.from?.first_name || "Seseorang";

      const TELEGRAM_TOKEN = "7908620487:AAF4g43C8WDQ_MPr2Eo9Dg2XYusyQbvMS6U";
      const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

      if (chatId) {
        if (messageText === "/start") {
          // Kirim gambar dengan caption
          await fetch(`${TELEGRAM_API}/sendPhoto`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuV_Xd5E10Hy4pVbYuMgYnA7iuk0XYNjKYwwH4XDGlfRvdGhteN6emetI&s=10",
              caption: "cit-cit cit-cit-cit 🐥",
              reply_markup: {
                keyboard: [{ text: "🐥 CIT-CIT", request_user: { request_id: 1 } }]
            ],
                resize_keyboard: true,
                one_time_keyboard: false
              }
            }),
          });
        } else if (messageText === "/thank") {
          // Balas pesan /thank
          await fetch(`${TELEGRAM_API}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: "Terima kasih sudah bergabung ke bot ini 🙏"
            }),
          });
        } else {
          // Balas pesan apapun selain /start dan /thank
          await fetch(`${TELEGRAM_API}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: `${userName} berkata: ${messageText}`
            }),
          });
        }
      }

      return new Response("OK", { status: 200 });
    }

    return new Response("Hello! This is a Telegram Webhook.", { status: 200 });
  },
};

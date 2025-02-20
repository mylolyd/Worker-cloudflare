//inline keybboard + menu button cloudflare worker
//7228922130:AAEfu57TU7RjWfAtzpZjYCfXzlQTNCVBRoo

export default {
      async fetch(request) {
        if (request.method === "POST") {
          const update = await request.json();
          const chatId = update.message?.chat.id;
          const messageText = update.message?.text || "";
          const userName = update.message?.from?.first_name || "Pengguna";
          const userId = update.message?.from?.id;
    
          const TELEGRAM_TOKEN = "7228922130:AAEfu57TU7RjWfAtzpZjYCfXzlQTNCVBRoo"; // Ganti dengan token bot kamu
          const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
    
          if (chatId) {
            if (messageText === "/start") {
              // 1. Menambahkan Menu Button (di dekat emoji)
              await fetch(`${TELEGRAM_API}/setChatMenuButton`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  menu_button: {
                    type: "web_app",
                    text: "💳 Wallet",
                    web_app: { url: "" } // Ganti dengan URL aplikasi jika ada
                  }
                }),
              });
    
              // 2. Mengirim pesan dengan Inline Keyboard
              await fetch(`${TELEGRAM_API}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: "Selamat datang! Pilih opsi di bawah:",
                  reply_markup: {
                    inline_keyboard: [
                      [{ text: "Klik Saya!", callback_data: "clicked" }]
                    ]
                  }
                }),
              });
    
            } else {
              // Jika pesan bukan /start, balas dengan format yang diminta
              await fetch(`${TELEGRAM_API}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `Halo ${userName}, id ${userId} dan berkata: ${messageText}`
                }),
              });
            }
          }
    
          return new Response("OK", { status: 200 });
        }
    
        return new Response("Hello! This is a Telegram Webhook notion.", { status: 200 });
      },
    };
    
    

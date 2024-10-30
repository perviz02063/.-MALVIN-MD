import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const alive = async (m, Matrix) => {
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / (24 * 3600));
  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
    if (['alive', 'uptime', 'runtime'].includes(cmd)) {

  const uptimeMessage = `
╭──────────────
│ 📆 ${days} 𝙳𝚊𝚢(𝚜)
│ 🕰️ ${hours} 𝙷𝚘𝚞𝚛(𝚜)
│ ⏳ ${minutes} 𝙼𝚒𝚗𝚞𝚝𝚎(𝚜)
│ ⏲️ ${seconds} 𝚂𝚎𝚌𝚘𝚗𝚍(𝚜)
│ 
│  𝙼𝙰𝙻𝚅𝙸𝙽 𝙼𝙳 𝙸𝚂 𝙾𝙽𝙻𝙸𝙽𝙴
╰───────────────`;

  const buttons = [
      {
        "name": "quick_reply",
        "buttonParamsJson": JSON.stringify({
          display_text: "Ping⏳",
          id: `${prefix}ping`
        })
      }
    ];

  const msg = generateWAMessageFromContent(m.from, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: uptimeMessage
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "© 𝙻𝙾𝚁𝙳 мαℓνιи",
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "",
            gifPlayback: true,
            subtitle: "",
            hasMediaAttachment: false 
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons
          }),
          contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '263780166288',
                  newsletterName: "MALVIN MD",
                  serverMessageId: 143
                }
              }
        }),
      },
    },
  }, {});

  await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  });
    }
};

export default alive;

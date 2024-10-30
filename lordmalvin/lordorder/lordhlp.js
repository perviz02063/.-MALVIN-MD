import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import axios from 'axios';

const searchRepo = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['menu', 'm', 'help', 'list'];

  if (validCommands.includes(cmd)) {
    const repoUrl = `https://api.github.com/repos/kingmalvn/MALVIN-MD`;
    
    await handleRepoCommand(m, Matrix, repoUrl);
  }
};

const handleRepoCommand = async (m, Matrix, repoUrl) => {
  try {
    const response = await axios.get(repoUrl);
    const repoData = response.data;

    const {
      full_name,
      name,
      forks_count,
      stargazers_count,
      created_at,
      updated_at,
      owner,
    } = repoData;

    const messageText = `╭──────────────
│ ✨️ ʙᴏᴛ ɴᴀᴍᴇ: *𝙼𝙰𝙻𝚅𝙸𝙽 𝙼𝙳*
│ 📌 ᴠᴇʀꜱɪᴏɴ: *_8.1.0_*
│ 👱 ᴏᴡɴᴇʀ : *𝙻𝚘𝚛𝚍 𝙼𝚊𝚕𝚟𝚒𝚗*
│ 🪩 ᴘʟᴀᴛғᴏʀᴍ: *ʟɪɴᴜx*
│ 💾 ʀᴀᴍ : *64GB*
│ 📱 ᴅᴀɪʟʏ ᴜsᴇʀs : *${forks_count}*
│ 📆 ᴄʀᴇᴀᴛᴇᴅ ᴏɴ : *${new Date(created_at).toLocaleDateString()}*
╰───────────────

    `;

    const repoMessage = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: messageText,
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '✨️𝐁𝐄𝐒𝐓 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐁𝐎𝐓💫\n\n𝐌𝐀𝐃𝐄 𝐁𝐘 𝐋𝐎𝐑𝐃 𝐌𝐀𝐋𝐕𝐈𝐍',
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              ...(await prepareWAMessageMedia({
                image: {
                  url: 'https://g.top4top.io/p_3218pggm51.jpg',
                },
              }, { upload: Matrix.waUploadToServer })),
              title: '',
              gifPlayback: true,
              subtitle: '',
              hasMediaAttachment: false,
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: "ᴄᴏᴍᴍᴀɴᴅꜱ😎",
                    id: ".command",
                  }),
                },
                 {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: "⏳ ᴩɪɴɢ",
                    id: ".ping",
                  }),
                },
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: "😎 ᴍᴀʟᴠɪɴ ʀᴇᴩᴏ",
                    url: 'https://github.com/kingmalvn/MALVIN-MD',
                  }),
                },
                {
                 name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: "📱 ʜᴏᴡ ᴛᴏ ᴅᴇᴩʟᴏy",
                    url: 'https://www.youtube.com/@malvintech2',
                  }),
                },
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: "🥤 ᴡʜᴀᴛꜱᴀᴩᴩ ᴄʜᴀɴɴᴇʟ",
                    url: 'https://whatsapp.com/channel/0029Vac8SosLY6d7CAFndv3Z',
                  }),
                },
              ],
            }),
            contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 9999,
              isForwarded: true,
            },
          }),
        },
      },
    }, {});

    await Matrix.relayMessage(repoMessage.key.remoteJid, repoMessage.message, {
      messageId: repoMessage.key.id,
    });
    await m.React('✨');
  } catch (error) {
    console.error('Error processing your request:', error);
    m.reply('Error processing your request.');
    await m.React('✨');
  }
};

export default searchRepo;

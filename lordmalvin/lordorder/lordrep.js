import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import axios from 'axios';

const searchRepo = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['repo', 'sc', 'script'];

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
│ 😎 ʙᴏᴛ ɴᴀᴍᴇ: ${name}
│ 📌 ᴠᴇʀꜱɪᴏɴ : 7.1.3
│ ✨ ꜱᴛᴀʀꜱ:  ${stargazers_count}
│ 🧧 ꜰᴏʀᴋꜱ: ${forks_count}
│ 📅 ʀᴇʟᴇᴀꜱᴇ ᴅᴀᴛᴇ: ${new Date(created_at).toLocaleDateString()}
│ 🕐 ᴜᴩᴅᴀᴛᴇ ᴏɴ:* ${new Date(updated_at).toLocaleDateString()}
│ 👱 ᴏᴡɴᴇʀ : *𝙻𝙾𝚁𝙳 мαℓνιи*
│ 
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
              text: '*© Lord Malvin*',
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
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: 'ꜱᴜʙꜱᴄʀɪʙᴇ ᴏɴ Yᴏᴜᴛᴜʙᴇ',
                    url: 'https://youtube.com/@malvintech2',
                  }),
                },
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: 'ᴍᴀʟᴠɪɴ ʙᴏᴛ ʀᴇᴩᴏ',
                    url: 'https://github.com/kingmalvn/MALVIN-MD/',
                  }),
                },
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: 'ᴡʜᴀᴛꜱᴀᴩᴩ ᴄʜᴀɴɴᴇʟ',
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
    await m.React('✅');
  } catch (error) {
    console.error('Error processing your request:', error);
    m.reply('Error processing your request.');
    await m.React('❌');
  }
};

export default searchRepo;

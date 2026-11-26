import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Music2, VolumeX, RotateCcw } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

/*
  Satu section = satu layar. Pilihan yang punya `reply` akan menampilkan
  balasan dulu, lalu tombol "Lanjut". Pilihan tanpa `reply` langsung lanjut.
*/
const sections = [
  {
    label: 'Opening',
    title: ['Hai, Ji.', 'Ada sesuatu yang ingin aku ceritakan.'],
    emLine: 1,
    body: [
      'Sebenarnya aku sudah cukup lama ingin menyampaikan sesuatu ke kamu.',
      'Tapi sepertinya akan lebih menarik kalau aku menceritakannya sedikit demi sedikit, daripada langsung mengatakannya begitu saja.',
      'Jadi, aku membuat sesuatu yang sederhana ini khusus untuk kamu.',
      'Isinya tentang bagaimana kita pertama kali kenal, bagaimana aku mulai tertarik sama kamu, sampai akhirnya aku memutuskan untuk menyampaikan ini.',
      'Sudah siap mendengarkannya?',
    ],
    choices: [
      { label: 'Sudah, coba ceritakan.' },
      { label: 'Memangnya mau cerita apa?', reply: 'Sabar, nanti juga kamu tahu. Hehe. Lanjut, ya?' },
    ],
  },
  {
    label: 'Awal Kita Kenal',
    title: ['Semua berawal', 'dari tempat kerja.'],
    emLine: 1,
    body: [
      'Kalau diingat-ingat, awal kita kenal sebenarnya cukup sederhana.',
      'Kita dipertemukan di tempat kerja, kebetulan berada di divisi yang sama dan bahkan satu ruangan.',
      'Awalnya, ya sebatas rekan kerja biasa. Bertemu setiap hari, melakukan pekerjaan masing-masing, dan sesekali berinteraksi.',
      'Waktu itu, aku juga tidak pernah berpikir kalau seseorang yang awalnya hanya kukenal sebagai teman kantor ternyata bisa membuatku tertarik seperti sekarang.',
      'Memang tidak ada yang istimewa dari awal perkenalan kita.',
      'Tapi ternyata, sesuatu yang berarti tidak selalu dimulai dari hal yang luar biasa.',
    ],
    choices: [
      { label: 'Iya, memang sesederhana itu.' },
      {
        label: 'Terus, kapan mulai tertarik?',
        reply: 'Nah, ini bagian yang sebenarnya ingin aku ceritakan. Ada satu hal yang mungkin belum kamu tahu.',
      },
    ],
  },
  {
    label: 'Hari Kesepuluh',
    title: ['Ternyata, tidak', 'butuh waktu lama.'],
    emLine: 1,
    body: [
      'Mungkin kamu tidak menyadarinya, tapi aku mulai tertarik sama kamu sejak hari kelima kita kenal.',
      'Agak cepat memang, ya?',
      'Aku juga tidak tahu persis apa yang membuatku mulai tertarik waktu itu.',
      'Mungkin karena interaksi kita, cara kamu membawa diri, atau hal-hal kecil yang sebenarnya terlihat biasa saja.',
      'Yang jelas, sejak saat itu aku mulai memperhatikan kamu sedikit berbeda.',
      'Awalnya mungkin hanya sekadar tertarik. Belum ada pikiran yang terlalu jauh.',
      'Tapi ternyata, perasaan itu tidak berhenti sampai di situ.',
    ],
    choices: [
      { label: 'Serius? Hari kesepuluh?' },
      {
        label: 'Kok aku nggak tahu?',
        reply: 'Memang belum pernah aku ceritakan. Waktu itu aku juga belum tahu harus bagaimana menyikapinya.',
      },
    ],
  },
  {
    label: 'Mulai Terbiasa',
    title: ['Dari yang biasa, jadi', 'sesuatu yang berbeda.'],
    emLine: 1,
    body: [
      'Seiring berjalannya waktu, kita mulai terbiasa dengan keberadaan satu sama lain.',
      'Karena satu divisi dan satu ruangan, tentu ada banyak kesempatan untuk berinteraksi.',
      'Ada obrolan ringan, bercanda, membicarakan pekerjaan, sampai hal-hal sederhana lainnya.',
      'Mungkin buat kamu itu semua biasa saja.',
      'Tapi buat aku, ada sesuatu yang berbeda.',
      'Aku mulai menikmati momen-momen kecil itu. Bahkan terkadang, hal sederhana yang terjadi di antara kita bisa membuat hari terasa lebih menyenangkan.',
      'Dari situ aku mulai sadar kalau ternyata aku senang bisa mengenal kamu lebih jauh.',
    ],
    choices: [
      { label: 'Aku juga senang kok.' },
      {
        label: 'Baru sadar ternyata begitu.',
        reply: 'Hehe, mungkin memang tidak terlihat. Tapi aku cukup menikmati setiap prosesnya.',
      },
    ],
  },
  {
    label: 'Ingin Mengenal Lebih Jauh',
    title: ['Ternyata aku ingin tahu', 'lebih banyak tentang kamu.'],
    emLine: 1,
    body: [
      'Pada awalnya, aku mengenal kamu sebagai teman kantor.',
      'Tapi semakin ke sini, aku merasa ingin mengenal kamu lebih dari itu.',
      'Aku ingin tahu tentang keseharian kamu, hal-hal yang kamu suka, cerita-cerita kamu, apa yang sedang kamu pikirkan, dan banyak hal lainnya.',
      'Bukan hanya tentang pekerjaan atau hal-hal yang kita temui di kantor.',
      'Aku ingin mengenal kamu sebagai diri kamu sendiri.',
      'Karena menurutku, mengenal seseorang bukan hanya tentang seberapa sering kita bertemu, tetapi juga tentang seberapa jauh kita mau memahami satu sama lain.',
      'Dan sepertinya, aku mulai menginginkan hal itu dengan kamu.',
    ],
    choices: [
      {
        label: 'Memangnya mau tahu apa?',
        reply: 'Banyak. Tapi sepertinya akan lebih seru kalau kita saling mengenal secara langsung, bukan hanya lewat cerita di website ini.',
      },
      { label: 'Lanjut, aku dengarkan.' },
    ],
  },
  {
    label: 'Semakin Yakin',
    title: ['Sampai akhirnya aku', 'menyadari sesuatu.'],
    emLine: 1,
    body: [
      'Kita memang belum terlalu lama saling mengenal. Baru sekitar tiga bulan.',
      'Tapi selama waktu itu, aku mulai menyadari bahwa ketertarikanku ke kamu bukan sekadar rasa penasaran sesaat.',
      'Ada keinginan untuk terus mengenal kamu, menghabiskan lebih banyak waktu bersama, dan mengetahui lebih banyak hal tentang kehidupan kamu.',
      'Aku juga sadar bahwa hubungan seperti ini tidak bisa dibangun hanya dari satu pihak.',
      'Perlu ada kemauan dari dua orang untuk saling mengenal, memahami, dan menjalani semuanya bersama.',
      'Aku tidak tahu bagaimana kamu melihat aku selama ini.',
      'Tapi setidaknya, aku tahu bagaimana perasaanku sendiri.',
      'Dan aku rasa, sudah waktunya aku menyampaikannya.',
    ],
    choices: [
      { label: 'Daffa, sebenarnya kamu mau bilang apa?' },
      {
        label: 'Aku mulai bisa menebak.',
        reply: 'Mungkin kamu sudah punya gambaran. Tapi biarkan aku menyampaikannya sampai selesai, ya.',
      },
    ],
  },
  {
    label: 'Ada yang Ingin Aku Sampaikan',
    title: ['Aku ingin', 'jujur sama kamu.'],
    emLine: 1,
    body: [
      'Ji,',
      'Thank you ya karena sudah menjadi bagian dari hari-hariku selama beberapa waktu ini.',
      'Mungkin buat kamu, kita hanya dua orang yang kebetulan bekerja di tempat, divisi, dan ruangan yang sama.',
      'Tapi buat aku, perkenalan ini ternyata membawa sesuatu yang lebih dari sekadar hubungan rekan kerja.',
      'Aku mulai tertarik sama kamu sejak hari kelima kita kenal, dan seiring berjalannya waktu, perasaan itu semakin jelas.',
      'Aku suka cara kamu menjadi diri sendiri. Aku senang bisa berbincang dengan kamu, dan aku ingin punya kesempatan untuk mengenal kamu lebih jauh.',
      'Aku tidak ingin terburu-buru menjanjikan banyak hal.',
      'Aku hanya ingin jujur bahwa aku punya perasaan lebih ke kamu.',
      'Dan ada satu hal yang ingin aku tanyakan.',
    ],
    choices: [
      { label: 'Iya, apa itu?' },
      {
        label: 'Aku jadi deg-degan.',
        reply: 'Hehe, aku juga sebenarnya cukup deg-degan menuliskan ini. Tapi sudah sampai di sini, jadi sekalian saja, ya.',
      },
    ],
  },
  {
    label: 'Pertanyaan untuk Ji',
    title: ['Jadi, Ji…'],
    emLine: 0,
    final: true,
    body: [
      'Setelah semua cerita tadi, mungkin sekarang kamu sudah tahu kenapa aku membuat website ini.',
      'Aku tidak tahu bagaimana perjalanan kita ke depannya. Aku juga tidak berharap semuanya harus berjalan sempurna.',
      'Tapi aku ingin mencoba mengenal kamu lebih jauh, bukan hanya sebagai teman kantor, melainkan sebagai seseorang yang punya tempat spesial dalam hidupku.',
      'Aku ingin kita punya lebih banyak cerita, lebih banyak waktu bersama, dan kesempatan untuk saling memahami satu sama lain.',
      'Aku ingin menjalani prosesnya bersama kamu.',
    ],
    question: ['Jadi, Jihan…', 'Maukah kamu jadi teman hidupku?'],
    choices: [{ label: 'Mau', yes: true }, { label: 'Aku pikir-pikir dulu', no: true }],
  },
]

const finalNoReplies = [
  'Tidak apa-apa. Aku tunggu, tidak perlu terburu-buru.',
  'Apa pun jawabannya, aku tetap senang pernah mengenal kamu. Tidak ada paksaan sama sekali.',
]

const pad = (n) => String(n).padStart(2, '0')

function App() {
  const [idx, setIdx] = useState(0)
  const [reply, setReply] = useState(null) // { text, action: 'next' | 'stay' }
  const [noCount, setNoCount] = useState(0)
  const [done, setDone] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [musicHint, setMusicHint] = useState(false)
  const audioRef = useRef(null)

  const s = sections[idx]
  const last = sections.length - 1
  const light = done || s.final
  const progress = done ? 100 : (idx / last) * 100

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [idx, done])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (musicOn) {
      audio.pause()
      setMusicOn(false)
      return
    }
    try {
      await audio.play()
      setMusicOn(true)
    } catch {
      setMusicHint(true)
      setTimeout(() => setMusicHint(false), 4000)
    }
  }

  const next = () => setIdx((i) => Math.min(i + 1, last))

  const choose = (c) => {
    if (c.yes) return setDone(true)
    if (c.no) {
      setReply({ text: finalNoReplies[Math.min(noCount, finalNoReplies.length - 1)], action: 'stay' })
      setNoCount((n) => n + 1)
      return
    }
    if (c.reply) return setReply({ text: c.reply, action: 'next' })
    next()
  }

  const continueAfterReply = () => {
    const action = reply.action
    setReply(null)
    if (action === 'next') next()
  }

  const restart = () => {
    setDone(false)
    setReply(null)
    setNoCount(0)
    setIdx(0)
  }

  const choicesDelay = 0.6 + s.body.length * 0.3

  return (
    <main data-theme={light ? 'light' : 'dark'}>
      <div className="grain" />
      <div className="progress"><span style={{ width: `${progress}%` }} /></div>

      <nav className="nav">
        <span className="wordmark">for ji</span>
        <button className="music" onClick={toggleMusic} aria-label="Toggle musik">
          {musicOn ? <Music2 size={14} /> : <VolumeX size={14} />}
          <span>{musicOn ? 'Musik nyala' : 'Musik mati'}</span>
        </button>
      </nav>
      <audio ref={audioRef} src="/music/background.mp3" loop preload="none" />

      <AnimatePresence>
        {musicHint && (
          <motion.div className="toast" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            Tambahkan file <b>public/music/background.mp3</b> dulu ya.
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.section
            key={idx}
            className={`stage ${s.final ? 'is-final' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7 } }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
          >
            <div className="ghost" aria-hidden="true">{idx === 0 ? '✦' : pad(idx)}</div>

            <motion.div
              className="kicker"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease } }}
            >
              <span>{idx === 0 ? s.label : `Chapter ${pad(idx)} — ${s.label}`}</span>
            </motion.div>

            <motion.h1
              className="title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.1 } }}
            >
              {s.title.map((line, i) => (
                <span key={i} className={i === s.emLine ? 'em' : ''}>
                  {line}
                  {i < s.title.length - 1 && <br />}
                </span>
              ))}
            </motion.h1>

            <div className="paras">
              {s.body.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.5 + i * 0.3 } }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {s.question && (
              <motion.div
                className="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: choicesDelay } }}
              >
                <em>{s.question[1]}</em>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {reply ? (
                <motion.div
                  key="reply"
                  className="reply-wrap"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease } }}
                  exit={{ opacity: 0 }}
                >
                  <p className="reply">{reply.text}</p>
                  <button className="link-btn" onClick={continueAfterReply}>
                    {reply.action === 'stay' ? 'Kembali ke pertanyaan' : 'Lanjut'} <ArrowRight size={15} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="choices"
                  className="choices"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease, delay: s.question ? choicesDelay + 0.5 : choicesDelay },
                  }}
                  exit={{ opacity: 0 }}
                >
                  {s.choices.map((c) => (
                    <button key={c.label} className={`choice ${c.yes ? 'primary' : ''}`} onClick={() => choose(c)}>
                      <span>{c.label}</span>
                      <ArrowRight size={16} />
                    </button>
                  ))}
                  {s.final && <span className="note">Tidak ada paksaan. Apa pun jawabannya, terima kasih sudah membaca sampai sini.</span>}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        ) : (
          <motion.section
  key="done"
  className="stage ending"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1, transition: { duration: 1 } }}
>
  <div className="kicker"><span>Jawabanku</span></div>
  <motion.h1
    className="title huge"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 1, ease, delay: 0.3 } }}
  >
    I said <span className="em">yes.</span>
  </motion.h1>
  <motion.div
    className="paras"
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 1 } }}
  >
    <p>Terima kasih sudah jujur dan sabar menceritakan semuanya, Daffa.</p>
    <p>Aku mau mulai cerita ini bersama kamu.</p>
    <p className="sign">— Ji</p>
  </motion.div>
  <motion.button
    className="link-btn"
    onClick={restart}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { delay: 1.8 } }}
  >
    <RotateCcw size={14} /> Baca dari awal
  </motion.button>
</motion.section>
        )}
      </AnimatePresence>
    </main>
  )
}

export default App

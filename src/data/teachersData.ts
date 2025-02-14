import { Teacher } from '../types/Teacher';

export const teachersData: Teacher[] = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    title: "Baş Antrenör",
    media: [
      {
        type: "image",
        url: "https://picsum.photos/seed/teacher1/500/500"
      },
      {
        type: "video",
        url: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
        thumbnail: "https://picsum.photos/seed/teacher1-video/500/500"
      },
      {
        type: "image",
        url: "https://picsum.photos/seed/teacher1-action/500/500"
      }
    ],
    description: "20 yıllık kickbox deneyimi ile profesyonel sporculara eğitim vermektedir.",
    specialties: ["Kickbox", "Muay Thai", "Kondisyon"],
    achievements: ["2019 Türkiye Şampiyonası Antrenör Ödülü", "15+ Ulusal Şampiyon Sporcu Yetiştirme"],
    experience: "20+ yıl profesyonel antrenörlük",
    education: "Spor Bilimleri Fakültesi - Antrenörlük Eğitimi"
  },
  {
    id: 2,
    name: "Ayşe Demir",
    title: "Yardımcı Antrenör",
    media: [
      {
        type: "image",
        url: "https://picsum.photos/seed/teacher2/500/500"
      },
      {
        type: "image",
        url: "https://picsum.photos/seed/teacher2-training/500/500"
      }
    ],
    description: "Ulusal şampiyonlukları bulunan deneyimli bir eğitmen.",
    specialties: ["Kickbox", "Fitness", "Beslenme"],
    achievements: ["2020 Avrupa Şampiyonası 3.lük", "Beslenme Uzmanlığı Sertifikası"],
    experience: "10 yıl aktif spor, 5 yıl antrenörlük",
    education: "Beslenme ve Diyetetik Bölümü"
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    title: "Kondisyon Antrenörü",
    media: [
      {
        type: "image",
        url: "https://picsum.photos/seed/teacher3/500/500"
      },
      {
        type: "video",
        url: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
        thumbnail: "https://picsum.photos/seed/teacher3-video/500/500"
      }
    ],
    description: "Fitness ve kondisyon alanında 10 yıllık deneyime sahip uzman eğitmen.",
    specialties: ["Kondisyon", "Fitness", "Beslenme Programı"],
    achievements: ["Profesyonel Fitness Eğitmenliği", "Sporcu Beslenmesi Sertifikası"],
    experience: "10 yıl fitness eğitmenliği",
    education: "Spor Bilimleri - Fitness Eğitmenliği"
  },
  {
    id: 4,
    name: "Zeynep Şahin",
    title: "Muay Thai Eğitmeni",
    media: [
      {
        type: "image",
        url: "https://picsum.photos/seed/teacher4/500/500"
      },
      {
        type: "image",
        url: "https://picsum.photos/seed/teacher4-action/500/500"
      }
    ],
    description: "Uluslararası müsabakalarda derece sahibi, deneyimli Muay Thai eğitmeni.",
    specialties: ["Muay Thai", "Kickbox", "Dövüş Teknikleri"],
    achievements: ["Dünya Muay Thai Şampiyonası 2.lik", "Milli Takım Antrenörlüğü"],
    experience: "15 yıl aktif spor, 8 yıl antrenörlük",
    education: "Spor Akademisi - Dövüş Sporları"
  },
  {
    id: 5,
    name: "Can Yıldız",
    title: "Gençlik Antrenörü",
    media: [
      {
        type: "image",
        url: "https://picsum.photos/seed/teacher5/500/500"
      },
      {
        type: "video",
        url: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
        thumbnail: "https://picsum.photos/seed/teacher5-video/500/500"
      }
    ],
    description: "Genç sporcuların yetiştirilmesinde uzmanlaşmış deneyimli eğitmen.",
    specialties: ["Genç Sporcu Gelişimi", "Temel Teknik", "Motivasyon"],
    achievements: ["Gençlik Sporları Gelişim Sertifikası", "En İyi Genç Antrenör Ödülü 2023"],
    experience: "12 yıl gençlik antrenörlüğü",
    education: "Çocuk Gelişimi ve Spor Eğitmenliği"
  },
  {
    id: 6,
    name: "Elif Arslan",
    title: "Teknik Direktör",
    media: [
      {
        type: "image",
        url: "https://picsum.photos/seed/teacher6/500/500"
      },
      {
        type: "image",
        url: "https://picsum.photos/seed/teacher6-training/500/500"
      },
      {
        type: "video",
        url: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
        thumbnail: "https://picsum.photos/seed/teacher6-video/500/500"
      }
    ],
    description: "Profesyonel sporcu yetiştirme ve teknik geliştirmede uzman eğitmen.",
    specialties: ["İleri Teknik", "Taktik Geliştirme", "Performans Analizi"],
    achievements: ["Uluslararası Antrenörlük Lisansı", "Teknik Direktörlük Sertifikası"],
    experience: "18 yıl profesyonel antrenörlük",
    education: "Spor Yönetimi ve Antrenörlük"
  }
]; 
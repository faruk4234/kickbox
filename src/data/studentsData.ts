import { Student } from '../types/Student';

export const studentsData: Student[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    title: 'Profesyonel Kickboksçu',
    purpose: 'Profesyonel kariyere hazırlanmak',
    startYear: 2018,
    experience: '5 Yıl',
    success: 'Türkiye Şampiyonası 2. Lig Birincisi',
    specialties: ['Kickboks', 'Muay Thai', 'Fitness'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      }
    ],
    bio: 'Ahmet, 2018 yılında kickboks eğitimine başladı ve kısa sürede yetenekleriyle dikkat çekti. Şu anda profesyonel kariyerine hazırlanıyor ve çeşitli turnuvalarda başarılar elde etti.',
    achievements: [
      'Türkiye Şampiyonası 2. Lig Birincisi (2021)',
      'İstanbul İl Şampiyonası Birincisi (2020)',
      '3 Profesyonel Maç: 2 Galibiyet, 1 Mağlubiyet'
    ],
    gallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        title: 'Antrenman Seansı',
        description: 'Yoğun bir antrenman seansı sırasında'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517438322307-e67111335449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        title: 'Turnuva Hazırlığı',
        description: 'Türkiye Şampiyonası öncesi hazırlık'
      }
    ]
  },
 
  {
    id: 3,
    name: 'Mehmet Demir',
    title: 'Yarı Profesyonel Kickboksçu',
    purpose: 'Ulusal şampiyonalarda başarı elde etmek',
    startYear: 2017,
    experience: '6 Yıl',
    success: 'Ulusal Kickboks Turnuvası İkincisi',
    specialties: ['Kickboks', 'Boks', 'Kondisyon'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
      }
    ],
    bio: 'Mehmet, 6 yıllık kickboks deneyimiyle yarı profesyonel kategoride yarışıyor. Ulusal turnuvalarda çeşitli dereceler elde etti ve profesyonel kariyere geçiş hazırlığında.',
    achievements: [
      'Ulusal Kickboks Turnuvası İkincisi (2022)',
      'Bölgesel Şampiyona Birincisi (2021)',
      '8 Yarı Profesyonel Maç: 6 Galibiyet, 2 Mağlubiyet'
    ],
    gallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
        title: 'Ring Antrenmanı',
        description: 'Haftalık ring çalışması sırasında'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        title: 'Şampiyona Hazırlığı',
        description: 'Ulusal turnuva öncesi son hazırlıklar'
      }
    ]
  },
  {
    id: 4,
    name: 'Ayşe Yıldız',
    title: 'Amatör Kickboksçu',
    purpose: 'Fiziksel ve zihinsel gelişim',
    startYear: 2021,
    experience: '2 Yıl',
    success: 'Yerel Turnuva Katılımcısı',
    specialties: ['Kickboks', 'Fitness', 'Esneklik'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      }
    ],
    bio: 'Ayşe, fiziksel ve zihinsel gelişim amacıyla kickboksa başladı. Henüz yeni olmasına rağmen hızlı bir ilerleme kaydetti ve yerel turnuvalara katılmaya başladı.',
    achievements: [
      'Yerel Turnuva Katılımı (2022)',
      'Fitness ve Esneklik Gelişimi'
    ],
    gallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1583454155184-870a1f63aebc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        title: 'Teknik Çalışma',
        description: 'Temel teknik çalışması sırasında'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        title: 'Esneklik Antrenmanı',
        description: 'Esneklik ve kondisyon çalışması'
      }
    ]
  }
]; 
// CrossFit Alanı Dönüşüm Projesi - Grafikler ve İnteraktif Öğeler

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Toggle Navigation
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Bütçe Grafiği
    const budgetCtx = document.getElementById('budgetChart').getContext('2d');
    const budgetChart = new Chart(budgetCtx, {
        type: 'pie',
        data: {
            labels: ['Ekipman (%45)', 'Zemin Kaplaması (%25)', 'İşçilik (%20)', 'Diğer Giderler (%10)'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: [
                    '#e63946',
                    '#457b9d',
                    '#1d3557',
                    '#a8dadc'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Maliyet Dağılımı'
                }
            }
        }
    });
    
    // Geri Dönüş Grafiği
    const returnCtx = document.getElementById('returnChart').getContext('2d');
    const returnChart = new Chart(returnCtx, {
        type: 'line',
        data: {
            labels: ['1. Ay', '3. Ay', '6. Ay', '9. Ay', '12. Ay'],
            datasets: [{
                label: 'Yatırım Geri Dönüşü (%)',
                data: [10, 30, 60, 85, 110],
                fill: false,
                borderColor: '#e63946',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Geri Dönüş Yüzdesi (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Zaman'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Tahmini Yatırım Geri Dönüş Grafiği'
                }
            }
        }
    });
    
    // Üye Artış Grafiği
    if (document.getElementById('membershipChart')) {
        const membershipCtx = document.getElementById('membershipChart').getContext('2d');
        const membershipChart = new Chart(membershipCtx, {
            type: 'bar',
            data: {
                labels: ['Mevcut Durum', '3. Ay', '6. Ay', '12. Ay'],
                datasets: [{
                    label: 'Üye Sayısı',
                    data: [100, 115, 130, 150],
                    backgroundColor: [
                        '#a8dadc',
                        '#a8dadc',
                        '#a8dadc',
                        '#e63946'
                    ],
                    borderColor: [
                        '#457b9d',
                        '#457b9d',
                        '#457b9d',
                        '#1d3557'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Üye Sayısı'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Tahmini Üye Artışı'
                    }
                }
            }
        });
    }
    
    // Animasyonlar ve İnteraktif Öğeler
    const sections = document.querySelectorAll('.section');
    
    // Görünüm alanına giren bölümleri tespit etme
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}); 
/**
 * EduTHCS - Kịch bản tương tác cho Trang chủ Hỗ Trợ Học Tập Cấp 2
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSearchPopup();
    initBackToTop();
    checkUserSessionHeader();
});

function checkUserSessionHeader() {
    const rawUser = localStorage.getItem('eduthcs_user');
    if (!rawUser) return;
    try {
        const user = JSON.parse(rawUser);
        if (!user || !user.fullName) return;

        const navCta = document.querySelector('.nav-cta');
        if (navCta) {
            const loginBtn = navCta.querySelector('a[href="login.html"]');
            if (loginBtn) {
                const dashboardUrl = user.role === 'admin' ? 'admin.html' : 'user-dashboard.html';
                let icon = 'fa-user-graduate';
                if (user.role === 'admin') icon = 'fa-user-shield';
                else if (user.role === 'teacher') icon = 'fa-chalkboard-user';
                else if (user.role === 'parent') icon = 'fa-users';

                loginBtn.outerHTML = `
                    <div class="user-header-group" style="display:inline-flex; align-items:center; gap:8px;">
                        <a href="profile.html" class="btn btn-primary" title="Xem & Chỉnh sửa trang cá nhân">
                            <i class="fa-solid ${icon}"></i> ${user.fullName}
                        </a>
                        <a href="${dashboardUrl}" class="btn btn-outline" title="${user.role === 'admin' ? 'Bảng Quản Trị Admin' : 'Góc Học Tập'}">
                            <i class="fa-solid ${user.role === 'admin' ? 'fa-gauge-high' : 'fa-chart-line'}"></i>
                        </a>
                    </div>
                `;
            }
        }
    } catch(e) {}
}

/* ==========================================================
   1. ĐIỀU HƯỚNG & MENU TRÊN MOBILE
   ========================================================== */
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const dropdownParents = document.querySelectorAll('.has-dropdown');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Toggle dropdown trên mobile khi click
    dropdownParents.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 868) {
                item.classList.toggle('active');
            }
        });
    });

    // Đóng menu khi click vào một link thông thường
    const singleLinks = document.querySelectorAll('.nav-links a:not(.has-dropdown > a)');
    singleLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                if (mobileMenuBtn) {
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

/* ==========================================================
   2. TÌM KIẾM NHANH TRÊN HEADER
   ========================================================== */
function initSearchPopup() {
    const searchTrigger = document.getElementById('searchTrigger');
    const searchPopup = document.getElementById('searchPopup');
    const closeSearch = document.getElementById('closeSearch');
    const mainSearchInput = document.getElementById('mainSearchInput');

    if (searchTrigger && searchPopup && closeSearch) {
        searchTrigger.addEventListener('click', () => {
            searchPopup.classList.toggle('active');
            if (searchPopup.classList.contains('active')) {
                mainSearchInput.focus();
            }
        });

        closeSearch.addEventListener('click', () => {
            searchPopup.classList.remove('active');
        });

        mainSearchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const query = mainSearchInput.value.trim().toLowerCase();
                if (query) {
                    // Scroll tới phần môn học và lọc
                    const monHocSection = document.getElementById('mon-hoc');
                    if (monHocSection) {
                        monHocSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    const subjectFilter = document.getElementById('subjectFilterInput');
                    if (subjectFilter) {
                        subjectFilter.value = query;
                        filterSubjectsByName();
                    }
                    searchPopup.classList.remove('active');
                }
            }
        });
    }
}

/* ==========================================================
   3. BỘ LỌC MÔN HỌC THEO KHỐI LỚP (LỚP 6, 7, 8, 9)
   ========================================================== */
function filterByGrade(grade) {
    // Đổi trạng thái active của nút Tab
    const tabButtons = document.querySelectorAll('.grade-tab-btn');
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-grade') === grade) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Lọc các thẻ môn học
    const subjectCards = document.querySelectorAll('.subject-card');
    subjectCards.forEach(card => {
        const cardGrades = card.getAttribute('data-grade').split(' ');
        if (grade === 'all' || cardGrades.includes(grade)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });

    // Nếu người dùng chọn từ dropdown menu, cuộn nhẹ tới danh sách môn học
    const targetSection = document.getElementById('mon-hoc');
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ==========================================================
   4. TÌM KIẾM TRỰC TIẾP TÊN MÔN HỌC (LIVE FILTER)
   ========================================================== */
function filterSubjectsByName() {
    const input = document.getElementById('subjectFilterInput');
    const filter = input.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.subjects-grid .subject-card');

    cards.forEach(card => {
        const nameAttr = card.getAttribute('data-name').toLowerCase();
        const titleText = card.querySelector('.subject-title').innerText.toLowerCase();
        
        if (nameAttr.includes(filter) || titleText.includes(filter)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

/* ==========================================================
   5. TRỢ LÝ HỎI ĐÁP / GIẢI BÀI TẬP TƯƠNG TÁC
   ========================================================== */
const sampleKnowledgeBase = {
    'Toán học': {
        keywords: ['diện tích', 'phương trình', 'căn bậc hai', 'đa thức', 'hình thoi', 'hình thang'],
        response: `💡 <strong>Gợi ý phương pháp giải môn Toán THCS:</strong><br>
        1. <strong>Xác định dạng toán:</strong> Đọc kỹ dữ kiện bài cho và điều kiện cần tìm.<br>
        2. <strong>Công thức áp dụng:</strong>
           - Nếu là đa thức: Phân tích thành nhân tử (đặt nhân tử chung, dùng 7 hằng đẳng thức đáng nhớ).<br>
           - Nếu là hình học: Vẽ hình chuẩn xác, chú ý các cặp tam giác bằng nhau hoặc tam giác đồng dạng.<br>
           - Nếu là rút gọn căn thức: Đặt điều kiện xác định (ĐKXĐ) rồi trục căn thức ở mẫu.<br>
        3. <strong>Kiểm tra lại:</strong> Thay giá trị nghiệm tìm được vào biểu thức ban đầu để tránh nghiệm ngoại lai.`
    },
    'Ngữ văn': {
        keywords: ['văn', 'nghị luận', 'lão hạc', 'soạn bài', 'phân tích', 'tác phẩm'],
        response: `📖 <strong>Dàn ý gợi ý cho bài Ngữ Văn Cấp 2:</strong><br>
        1. <strong>Mở bài:</strong> Dẫn dắt tác giả, hoàn cảnh sáng tác và luận điểm chính của tác phẩm/vấn đề.<br>
        2. <strong>Thân bài:</strong>
           - <em>Luận điểm 1:</em> Phân tích chi tiết biểu hiện nghệ thuật và tâm trạng nhân vật.<br>
           - <em>Luận điểm 2:</em> Đánh giá giá trị nhân đạo hoặc triết lý nhân sinh được gửi gắm.<br>
           - <em>Đánh giá nghệ thuật:</em> Ngôn ngữ chọn lọc, nghệ thuật miêu tả tâm lý đặc sắc.<br>
        3. <strong>Kết bài:</strong> Khái quát lại cảm nghĩ bản thân và bài học thực tế cuộc sống.`
    },
    'Tiếng Anh': {
        keywords: ['thì', 'ngữ pháp', 'tenses', 'unit', 'từ vựng', 'vào 10'],
        response: `🌐 <strong>Mẹo làm bài thi Tiếng Anh THCS:</strong><br>
        1. <strong>Các thì trọng tâm cần nhớ:</strong> Hiện tại đơn, Quá khứ đơn, Hiện tại hoàn thành, Tương lai đơn.<br>
        2. <strong>Dấu hiệu nhận biết:</strong> Chú ý các trạng từ chỉ thời gian (yesterday, since, for, already, yet).<br>
        3. <strong>Bí quyết phần Đọc hiểu:</strong> Đọc câu hỏi trước để xác định từ khóa (Keyword), sau đó rà soát đoạn văn để tìm câu chứa thông tin đối chiếu.`
    },
    'Khoa học Tự nhiên': {
        keywords: ['phương trình hóa học', 'cân bằng', 'vật lý', 'sinh học', 'nguyên tử'],
        response: `🔬 <strong>Phương pháp học tốt Khoa Học Tự Nhiên (Lý - Hóa - Sinh):</strong><br>
        1. <strong>Hóa học:</strong> Áp dụng định luật bảo toàn khối lượng khi cân bằng phương trình hóa học. Cân bằng theo thứ tự: Kim loại -> Phi kim -> Hidro -> Oxi.<br>
        2. <strong>Vật lý:</strong> Luôn đổi đơn vị chuẩn trước khi thay vào công thức (km/h sang m/s, cm sang m).<br>
        3. <strong>Sinh học:</strong> Ghi nhớ sơ đồ quá trình (quang hợp, hô hấp, tuần hoàn) bằng hình ảnh màu sắc.`
    }
};

function handleAskQuestion() {
    const questionInput = document.getElementById('qaQuestionInput');
    const subjectSelect = document.getElementById('qaSubjectSelect');
    const gradeSelect = document.getElementById('qaGradeSelect');
    const responseBox = document.getElementById('qaResponseBox');
    const responseBody = document.getElementById('qaResponseBody');

    const question = questionInput.value.trim();
    if (!question) {
        alert('Vui lòng nhập câu hỏi hoặc bài tập bạn cần hỗ trợ nhé!');
        questionInput.focus();
        return;
    }

    // Hiển thị trạng thái đang xử lý
    responseBody.innerHTML = `<em><i class="fa-solid fa-spinner fa-spin"></i> Trợ lý đang phân tích đề bài môn <strong>${subjectSelect.value} (${gradeSelect.value})</strong>...</em>`;
    responseBox.style.display = 'block';

    setTimeout(() => {
        const subject = subjectSelect.value;
        const info = sampleKnowledgeBase[subject];

        let answerContent = '';
        if (info) {
            answerContent = `
                <div style="margin-bottom: 10px; color: #38bdf8;">
                    <strong>[${gradeSelect.value} - ${subject}]</strong> Câu hỏi của bạn: "<em>${escapeHTML(question)}</em>"
                </div>
                ${info.response}
                <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.2); font-size: 0.85rem; color: #94a3b8;">
                    ✅ Gợi ý từ thư viện EduTHCS. Bạn có thể tải bài giải mẫu PDF tương tự trong mục Thư viện đề thi!
                </div>
            `;
        } else {
            answerContent = `
                <div style="margin-bottom: 10px; color: #38bdf8;">
                    <strong>[${gradeSelect.value} - ${subject}]</strong> Đã ghi nhận câu hỏi: "<em>${escapeHTML(question)}</em>"
                </div>
                💡 <strong>Hướng dẫn:</strong> Với câu hỏi này, bạn hãy xem lại các chuyên đề trong sách giáo khoa mới của <strong>${subject}</strong> hoặc bấm nút "Vào học ngay" ở thẻ môn học để tra cứu bài giải chi tiết từng trang SGK nhé!
            `;
        }

        responseBody.innerHTML = answerContent;
    }, 400);
}

function suggestQuestion(text) {
    const input = document.getElementById('qaQuestionInput');
    if (input) {
        input.value = text;
        input.scrollIntoView({ behavior: 'smooth' });
        input.focus();
        handleAskQuestion();
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

/* ==========================================================
   6. MODAL CHI TIẾT MÔN HỌC
   ========================================================== */
const subjectDetailsData = {
    'math': {
        title: 'Môn Toán Học Cấp 2 (THCS)',
        grade: 'Chương trình chuẩn Lớp 6, 7, 8, 9',
        icon: '<i class="fa-solid fa-calculator" style="color: #2563eb;"></i>',
        bg: '#dbeafe',
        content: `
            <p><strong>Toán học THCS</strong> là nền tảng cốt lõi rèn luyện tư duy logic, bao gồm 2 phân môn quan trọng:</p>
            <ul>
                <li><strong>Đại số:</strong> Tập hợp số, số nguyên, phân số, đa thức, phương trình bậc nhất, hệ phương trình và bất đẳng thức.</li>
                <li><strong>Hình học:</strong> Hình học phẳng, tam giác bằng nhau, tam giác đồng dạng, đường tròn và hình học không gian trực quan.</li>
            </ul>
            <p><strong>Tài nguyên học tập có sẵn:</strong> 180+ bài giảng video, 1200+ bài tập trắc nghiệm có giải thích, sơ đồ công thức toán bỏ túi.</p>
        `
    },
    'literature': {
        title: 'Môn Ngữ Văn Cấp 2 (THCS)',
        grade: 'Chương trình chuẩn Lớp 6, 7, 8, 9',
        icon: '<i class="fa-solid fa-book-bookmark" style="color: #d97706;"></i>',
        bg: '#fef3c7',
        content: `
            <p><strong>Ngữ Văn THCS</strong> rèn luyện khả năng cảm thụ nghệ thuật, diễn đạt ngôn ngữ và tư duy phản biện:</p>
            <ul>
                <li><strong>Đọc hiểu văn bản:</strong> Thơ lục bát, truyện ngắn hiện đại, văn bản thông tin, ký và kịch.</li>
                <li><strong>Viết văn:</strong> Văn tự sự, văn biểu cảm, văn thuyết minh và đoạn văn nghị luận xã hội/văn học.</li>
                <li><strong>Tiếng Việt:</strong> Từ vựng, các biện pháp tu từ (so sánh, nhân hóa, ẩn dụ, hoán dụ), ngữ pháp câu.</li>
            </ul>
            <p><strong>Kho tài liệu:</strong> 500+ bài văn mẫu chọn lọc, hướng dẫn soạn bài bám sát 3 bộ sách mới.</p>
        `
    },
    'english': {
        title: 'Môn Tiếng Anh Cấp 2 (English)',
        grade: 'Chương trình chuẩn Lớp 6, 7, 8, 9',
        icon: '<i class="fa-solid fa-globe" style="color: #059669;"></i>',
        bg: '#d1fae5',
        content: `
            <p><strong>Tiếng Anh THCS</strong> chú trọng phát triển toàn diện 4 kỹ năng Nghe - Nói - Đọc - Viết:</p>
            <ul>
                <li><strong>Hệ thống ngữ pháp:</strong> Các thì cơ bản, câu bị động, câu gián tiếp, mệnh đề quan hệ, câu điều kiện loại 1 & 2.</li>
                <li><strong>Từ vựng theo chủ đề:</strong> Family, School, Environment, Science and Technology, Future Jobs.</li>
                <li><strong>Luyện thi:</strong> Bộ đề thi vào lớp 10 các tỉnh thành có giải thích đáp án chi tiết.</li>
            </ul>
            <p><strong>Hỗ trợ:</strong> File nghe phát âm audio chuẩn bản xứ, flashcard học từ vựng mỗi ngày.</p>
        `
    },
    'science': {
        title: 'Môn Khoa Học Tự Nhiên (KHTN)',
        grade: 'Chương trình tích hợp Lớp 6, 7, 8, 9',
        icon: '<i class="fa-solid fa-flask-vial" style="color: #7c3aed;"></i>',
        bg: '#ede9fe',
        content: `
            <p><strong>Môn KHTN</strong> tích hợp 3 lĩnh vực tự nhiên với cách tiếp cận thực tế, khám phá thế giới:</p>
            <ul>
                <li><strong>Vật lý:</strong> Lực và chuyển động, năng lượng, ánh sáng, điện học và từ học.</li>
                <li><strong>Hóa học:</strong> Nguyên tử, nguyên tố, bảng tuần hoàn, phản ứng hóa học, axit, bazơ, muối.</li>
                <li><strong>Sinh học:</strong> Tế bào, cơ thể sinh vật, di truyền học và hệ sinh thái.</li>
            </ul>
            <p><strong>Tính năng độc quyền:</strong> Thí nghiệm mô phỏng tương tác 3D giúp học sinh dễ dàng hình dung phản ứng.</p>
        `
    },
    'history': {
        title: 'Môn Lịch Sử & Địa Lý',
        grade: 'Lớp 6, 7, 8, 9',
        icon: '<i class="fa-solid fa-landmark-dome" style="color: #b45309;"></i>',
        bg: '#ffedd5',
        content: `
            <p>Tóm tắt các mốc sự kiện lịch sử dựng nước và giữ nước cùng kiến thức địa lý tự nhiên - kinh tế xã hội phong phú qua dòng thời gian biểu đồ bắt mắt.</p>
        `
    },
    'informatics': {
        title: 'Môn Tin Học & Công Nghệ',
        grade: 'Lớp 6, 7, 8, 9',
        icon: '<i class="fa-solid fa-laptop-code" style="color: #0284c7;"></i>',
        bg: '#e0f2fe',
        content: `
            <p>Rèn luyện tư duy thuật toán máy tính, làm quen với lập trình khối Scratch và ngôn ngữ lập trình Python thực chiến.</p>
        `
    },
    'gdcd': {
        title: 'Giáo Dục Công Dân & Kỹ Năng Sống',
        grade: 'Lớp 6, 7, 8, 9',
        icon: '<i class="fa-solid fa-scale-balanced" style="color: #4f46e5;"></i>',
        bg: '#e0e7ff',
        content: `
            <p>Trang bị kiến thức pháp luật thiếu niên, các bài học đạo đức, kỹ năng tự bảo vệ bản thân và ứng xử văn minh trong học đường và gia đình.</p>
        `
    },
    'exam10': {
        title: 'Luyện Thi Tuyển Sinh Vào Lớp 10',
        grade: 'Dành riêng cho học sinh Lớp 9',
        icon: '<i class="fa-solid fa-medal" style="color: #dc2626;"></i>',
        bg: '#fee2e2',
        content: `
            <p>Lộ trình ôn tập 3 giai đoạn: Nắm chắc kiến thức nền tảng -> Luyện chuyên đề nâng cao -> Thực chiến giải đề thi thử bấm giờ của 63 tỉnh thành.</p>
        `
    }
};

function openSubjectModal(subjectKey) {
    const data = subjectDetailsData[subjectKey];
    if (!data) return;

    const modal = document.getElementById('subjectModal');
    const title = document.getElementById('modalSubjectTitle');
    const grade = document.getElementById('modalSubjectGrade');
    const icon = document.getElementById('modalSubjectIcon');
    const body = document.getElementById('modalSubjectBody');

    title.innerText = data.title;
    grade.innerText = data.grade;
    icon.innerHTML = data.icon;
    icon.style.backgroundColor = data.bg;
    body.innerHTML = data.content;

    modal.classList.add('active');
}

function closeSubjectModal() {
    const modal = document.getElementById('subjectModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Bấm ra ngoài modal để đóng
window.addEventListener('click', (e) => {
    const modal = document.getElementById('subjectModal');
    if (e.target === modal) {
        closeSubjectModal();
    }
});

/* ==========================================================
   7. NÚT CUỘN LÊN ĐẦU TRANG (BACK TO TOP)
   ========================================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================
   8. FORM ĐĂNG KÝ NHẬN TÀI LIỆU (NEWSLETTER)
   ========================================================== */
function handleNewsletter(event) {
    event.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();

    if (email) {
        alert(`🎉 Cảm ơn bạn! Hệ thống EduTHCS đã gửi cẩm nang công thức và bộ đề ôn tập Cấp 2 tới địa chỉ: ${email}`);
        emailInput.value = '';
    }
}

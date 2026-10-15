/**
 * EduTHCS - Kịch bản Quản Lý Trang Cá Nhân Từng Tài Khoản (User Profile Logic)
 */

let currentViewingUser = null;
let loggedInUser = null;

document.addEventListener('DOMContentLoaded', () => {
    initProfilePage();
});

function initProfilePage() {
    // Lấy thông tin user đang đăng nhập (nếu có)
    const rawLogged = localStorage.getItem('eduthcs_user');
    if (rawLogged) {
        try {
            loggedInUser = JSON.parse(rawLogged);
        } catch(e) {
            loggedInUser = null;
        }
    }

    // Xác định tài khoản cần hiển thị trên trang cá nhân
    const urlParams = new URLSearchParams(window.location.search);
    const targetQuery = urlParams.get('username') || urlParams.get('user') || urlParams.get('id');

    const allUsers = getStoredUsers();

    if (targetQuery) {
        currentViewingUser = findUserByQuery(targetQuery);
    }

    // Nếu không tìm thấy hoặc không có param, ưu tiên lấy tài khoản đang đăng nhập
    if (!currentViewingUser && loggedInUser) {
        currentViewingUser = findUserByQuery(loggedInUser.username || loggedInUser.id);
    }

    // Dùng hồ sơ minh họa chỉ trong bộ nhớ nếu chưa có tài khoản demo.
    if (!currentViewingUser) {
        currentViewingUser = allUsers.find(u => u.role === 'student') || allUsers[0] || {
            id: 'demo-profile',
            username: '',
            fullName: 'Học sinh demo',
            role: 'student',
            roleName: 'Học sinh',
            school: 'Trường demo',
            email: '',
            phone: '',
            bio: 'Đây là hồ sơ minh họa. Hãy đăng ký để tạo tài khoản demo trên thiết bị này.'
        };
        showGuestNotice();
    }

    renderProfileData();
    renderAccountSwitcher(allUsers);
    setupPasswordStrengthMeter();
}

function showGuestNotice() {
    const noticeBox = document.getElementById('guestNoticeBar');
    if (noticeBox) {
        noticeBox.style.display = 'block';
    }
}

/* ==========================================================
   RENDER DỮ LIỆU TRANG CÁ NHÂN
   ========================================================== */
function renderProfileData() {
    if (!currentViewingUser) return;
    const user = currentViewingUser;

    // 1. Cập nhật Tiêu đề trang
    document.title = `${user.fullName || user.username} - Trang Cá Nhân | EduTHCS`;

    // 2. Avatar & Màu sắc theo vai trò
    const avatarElem = document.getElementById('profileAvatarCircle');
    const avatarIconElem = document.getElementById('profileAvatarIcon');
    const roleBadgeElem = document.getElementById('profileRoleBadge');

    let roleIcon = 'fa-user-graduate';
    let roleText = 'Học Sinh Cấp 2';
    let roleBadgeClass = 'role-badge-student';
    let avatarBg = '#2563eb';

    if (user.role === 'admin') {
        roleIcon = 'fa-user-shield';
        roleText = user.roleName || 'Quản Trị Viên';
        roleBadgeClass = 'role-badge-admin';
        avatarBg = '#dc2626';
    } else if (user.role === 'teacher') {
        roleIcon = 'fa-chalkboard-user';
        roleText = user.roleName || 'Giáo Viên THCS';
        roleBadgeClass = 'role-badge-teacher';
        avatarBg = '#16a34a';
    } else if (user.role === 'parent') {
        roleIcon = 'fa-users';
        roleText = user.roleName || 'Phụ Huynh Học Sinh';
        roleBadgeClass = 'role-badge-parent';
        avatarBg = '#d97706';
    } else {
        roleIcon = 'fa-user-graduate';
        roleText = user.roleName || 'Học Sinh Cấp 2';
        roleBadgeClass = 'role-badge-student';
        avatarBg = '#2563eb';
    }

    if (avatarElem) avatarElem.style.backgroundColor = avatarBg;
    if (avatarIconElem) avatarIconElem.className = `fa-solid ${roleIcon}`;

    if (roleBadgeElem) {
        roleBadgeElem.className = `role-badge-pill ${roleBadgeClass}`;
        roleBadgeElem.innerHTML = `<i class="fa-solid ${roleIcon}"></i> ${roleText}`;
    }

    // 3. Họ tên & Thông tin định danh cơ bản
    setTextContent('profileFullName', user.fullName || 'Người Dùng EduTHCS');
    setTextContent('profileUsername', `@${user.username || 'user'}`);
    setTextContent('profileSchoolSubtitle', user.school || user.department || 'Cổng Giáo Dục EduTHCS');
    setTextContent('profileIdCode', user.id || 'ACC-EDUTHCS');

    const createdDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : '10/01/2026';
    setTextContent('profileJoinDate', createdDate);

    // 4. Sidebar Thông tin liên hệ & Giới thiệu
    setTextContent('sideInfoEmail', user.email || user.username || 'Chưa cập nhật');
    setTextContent('sideInfoPhone', user.phone || 'Chưa cập nhật');
    setTextContent('sideInfoGender', user.gender || 'Chưa xác định');
    setTextContent('sideInfoDob', user.dob ? formatDateVi(user.dob) : 'Chưa cập nhật');
    setTextContent('sideInfoAddress', user.address || 'Hà Nội, Việt Nam');
    setTextContent('sideInfoBio', user.bio || 'Chào mừng bạn đến với trang cá nhân EduTHCS! Chúc bạn có những giờ học tập bổ ích và hiệu quả.');

    // 5. Kiểm tra quyền sở hữu (Is Owner or Logged In)
    const isOwner = loggedInUser && (
        loggedInUser.username === user.username ||
        loggedInUser.id === user.id ||
        (user.aliases && user.aliases.includes(loggedInUser.username))
    );

    const btnLoginAs = document.getElementById('btnLoginAsUser');
    const ownerIndicator = document.getElementById('ownerIndicatorBadge');

    if (isOwner) {
        if (btnLoginAs) btnLoginAs.style.display = 'none';
        if (ownerIndicator) ownerIndicator.style.display = 'inline-flex';
    } else {
        if (btnLoginAs) {
            btnLoginAs.style.display = 'inline-flex';
            btnLoginAs.innerHTML = `<i class="fa-solid fa-arrow-right-to-bracket"></i> Đăng nhập bằng tài khoản này`;
        }
        if (ownerIndicator) ownerIndicator.style.display = 'none';
    }

    // 6. Render nội dung Tổng Quan chuyên biệt theo Vai Trò (Role-specific content)
    renderRoleSpecificContent(user);

    // 7. Điền thông tin vào form Chỉnh Sửa
    populateEditForm(user);
}

function renderRoleSpecificContent(user) {
    const container = document.getElementById('roleSpecificOverviewArea');
    if (!container) return;

    if (user.role === 'student') {
        container.innerHTML = generateStudentOverviewHTML(user);
    } else if (user.role === 'teacher') {
        container.innerHTML = generateTeacherOverviewHTML(user);
    } else if (user.role === 'parent') {
        container.innerHTML = generateParentOverviewHTML(user);
    } else if (user.role === 'admin') {
        container.innerHTML = generateAdminOverviewHTML(user);
    } else {
        container.innerHTML = generateStudentOverviewHTML(user);
    }
}

/* ==========================================================
   HTML GENERATORS CHO TỪNG VAI TRÒ
   ========================================================== */

// 1. DÀNH CHO HỌC SINH (STUDENT)
function generateStudentOverviewHTML(user) {
    const badges = user.badges || [
        { icon: 'fa-award', title: 'Kiện Tướng Toán Học', desc: 'Đạt điểm 9.5 bài kiểm tra Toán' },
        { icon: 'fa-fire-flame-curved', title: 'Chuyên Cần 30 Ngày', desc: 'Học tập liên tục không ngắt quãng' },
        { icon: 'fa-bolt', title: 'Tốc Độ Luyện Đề', desc: 'Hoàn thành 18 đề thi trong 1 tháng' },
        { icon: 'fa-medal', title: 'Top Học Sinh Giỏi', desc: 'Điểm trung bình học kỳ 9.2' }
    ];

    let badgeCards = '';
    badges.forEach(b => {
        badgeCards += `
            <div class="badge-item-card">
                <div class="badge-icon-box"><i class="fa-solid ${b.icon}"></i></div>
                <div class="badge-info">
                    <strong>${escapeHTML(b.title)}</strong>
                    <span>${escapeHTML(b.desc)}</span>
                </div>
            </div>
        `;
    });

    return `
        <!-- Thẻ thống kê nhanh học sinh -->
        <div class="stat-highlight-cards">
            <div class="stat-h-card">
                <div class="stat-h-icon theme-blue"><i class="fa-solid fa-graduation-cap"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">${user.gpa || '9.2'}</span>
                    <span class="stat-h-lbl">Điểm Trung Bình (GPA)</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-green"><i class="fa-solid fa-file-signature"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">18</span>
                    <span class="stat-h-lbl">Đề thi đã làm</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-orange"><i class="fa-solid fa-clock-rotate-left"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">42h</span>
                    <span class="stat-h-lbl">Thời gian tự học</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-purple"><i class="fa-solid fa-trophy"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">${user.rank || '#03'}</span>
                    <span class="stat-h-lbl">Xếp hạng lớp ${user.className || '9A1'}</span>
                </div>
            </div>
        </div>

        <!-- Mục tiêu thi vào lớp 10 -->
        <div class="profile-main-card">
            <div class="card-heading"><i class="fa-solid fa-bullseye text-primary"></i> Mục Tiêu Tuyển Sinh Lớp 10</div>
            <div class="target-exam-box">
                <div class="target-icon"><i class="fa-solid fa-school"></i></div>
                <div class="target-details">
                    <h4>Mục tiêu: ${escapeHTML(user.targetSchool || 'Trường THPT demo')}</h4>
                    <p><i class="fa-solid fa-check-double"></i> Mã học sinh: <strong>${user.studentCode || 'DEMO-0000'}</strong> • Chuỗi tự học: <strong>${user.studyStreak || '0 ngày'}</strong></p>
                </div>
            </div>
        </div>

        <!-- Bộ sưu tập Huy hiệu & Thành tích -->
        <div class="profile-main-card">
            <div class="card-heading"><i class="fa-solid fa-medal text-orange"></i> Huy Hiệu & Khen Thưởng Đạt Được</div>
            <div class="badges-container">
                ${badgeCards}
            </div>
        </div>

        <!-- Lịch sử các bài kiểm tra gần nhất -->
        <div class="profile-main-card">
            <div class="card-heading"><i class="fa-solid fa-chart-simple text-blue"></i> Kết Quả Luyện Đề Gần Đây</div>
            <div class="table-responsive">
                <table class="activity-log-table">
                    <thead>
                        <tr>
                            <th>Đề Kiểm Tra</th>
                            <th>Môn Học</th>
                            <th>Thời Gian</th>
                            <th>Điểm Số</th>
                            <th>Đánh Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Đề Thi Giữa Kỳ 1 Môn Toán 9</strong></td>
                            <td>Toán Học</td>
                            <td>45 phút</td>
                            <td><span style="color:#16a34a; font-weight:700;">9.5 / 10</span></td>
                            <td><span class="role-badge-pill role-badge-teacher">Xuất Sắc</span></td>
                        </tr>
                        <tr>
                            <td><strong>Đề Kiểm Tra Tiếng Anh 9 Unit 4</strong></td>
                            <td>Tiếng Anh</td>
                            <td>30 phút</td>
                            <td><span style="color:#16a34a; font-weight:700;">9.0 / 10</span></td>
                            <td><span class="role-badge-pill role-badge-teacher">Giỏi</span></td>
                        </tr>
                        <tr>
                            <td><strong>Trắc Nghiệm Hóa Học 8 Phản Ứng</strong></td>
                            <td>KHTN</td>
                            <td>20 phút</td>
                            <td><span style="color:#2563eb; font-weight:700;">8.5 / 10</span></td>
                            <td><span class="role-badge-pill role-badge-student">Khá Giỏi</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 2. DÀNH CHO GIÁO VIÊN (TEACHER)
function generateTeacherOverviewHTML(user) {
    return `
        <!-- Thẻ thống kê nhanh giáo viên -->
        <div class="stat-highlight-cards">
            <div class="stat-h-card">
                <div class="stat-h-icon theme-green"><i class="fa-solid fa-book-open"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">${user.publishedLessons || '48'}</span>
                    <span class="stat-h-lbl">Bài giảng đã xuất bản</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-blue"><i class="fa-solid fa-file-pen"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">${user.publishedExams || '26'}</span>
                    <span class="stat-h-lbl">Bộ đề kiểm tra biên soạn</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-orange"><i class="fa-solid fa-comments"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">${user.answeredQuestions || '356'}</span>
                    <span class="stat-h-lbl">Câu hỏi học sinh đã hỗ trợ</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-purple"><i class="fa-solid fa-star"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">${user.rating || '4.9'} / 5</span>
                    <span class="stat-h-lbl">Đánh giá từ học sinh</span>
                </div>
            </div>
        </div>

        <!-- Thông tin công tác & Chuyên môn -->
        <div class="profile-main-card">
            <div class="card-heading"><i class="fa-solid fa-chalkboard text-green"></i> Hồ Sơ Giảng Dạy & Chuyên Môn</div>
            <div class="info-list" style="margin-bottom: 20px;">
                <div class="info-item">
                    <span class="info-label"><i class="fa-solid fa-award"></i> Trình Độ Học Vị</span>
                    <span class="info-val">${escapeHTML(user.degree || 'Thạc sĩ Sư phạm Toán học - Đại học Sư phạm')}</span>
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="fa-solid fa-timeline"></i> Thâm Niên Giảng Dạy</span>
                    <span class="info-val">${escapeHTML(user.experience || '12 năm kinh nghiệm giảng dạy THCS')}</span>
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="fa-solid fa-users-rectangle"></i> Tổ Chuyên Môn</span>
                    <span class="info-val">${escapeHTML(user.department || 'Tổ Toán - Tin & Khoa Học Tự Nhiên')}</span>
                </div>
            </div>

            <div class="info-label" style="margin-bottom: 10px;"><i class="fa-solid fa-chalkboard-user"></i> Các Lớp THCS Đang Phụ Trách Giảng Dạy:</div>
            <div class="tags-list">
                <span class="tag-item primary"><i class="fa-solid fa-user-group"></i> Lớp 9A1 (Toán & Ôn thi vào 10)</span>
                <span class="tag-item primary"><i class="fa-solid fa-user-group"></i> Lớp 9A2 (Hình học 9)</span>
                <span class="tag-item"><i class="fa-solid fa-user-group"></i> Lớp 8B (Đại số 8)</span>
                <span class="tag-item"><i class="fa-solid fa-medal"></i> Đội tuyển HSG Toán Cấp 2</span>
            </div>
        </div>

        <!-- Khóa học & Bộ đề do giáo viên chủ trì -->
        <div class="profile-main-card">
            <div class="card-heading"><i class="fa-solid fa-folder-open text-blue"></i> Khóa Học & Đề Thi Tiêu Biểu</div>
            <div class="table-responsive">
                <table class="activity-log-table">
                    <thead>
                        <tr>
                            <th>Tên Chuyên Đề / Bộ Đề</th>
                            <th>Môn Học & Lớp</th>
                            <th>Số Lượt Học Sinh Học</th>
                            <th>Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Chuyên Đề: 7 Dạng Toán Thực Tế Ôn Thi Vào 10</strong></td>
                            <td>Toán Lớp 9</td>
                            <td>4.250 học sinh</td>
                            <td><span class="role-badge-pill role-badge-teacher">Đang xuất bản</span></td>
                        </tr>
                        <tr>
                            <td><strong>Phương Pháp Rút Gọn Biểu Thức Chứa Căn & Câu Hỏi Phụ</strong></td>
                            <td>Toán Lớp 9</td>
                            <td>3.890 học sinh</td>
                            <td><span class="role-badge-pill role-badge-teacher">Đang xuất bản</span></td>
                        </tr>
                        <tr>
                            <td><strong>Bộ 15 Đề Thi Thử Vào Lớp 10 Bám Sát Cấu Trúc Sở GD</strong></td>
                            <td>Toán Tuyển Sinh 10</td>
                            <td>5.620 học sinh</td>
                            <td><span class="role-badge-pill role-badge-teacher">Hot Nhất</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 3. DÀNH CHO PHỤ HUYNH (PARENT)
function generateParentOverviewHTML(user) {
    return `
        <!-- Thẻ thống kê nhanh phụ huynh -->
        <div class="stat-highlight-cards">
            <div class="stat-h-card">
                <div class="stat-h-icon theme-orange"><i class="fa-solid fa-child"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">${user.childName || 'Học sinh demo'}</span>
                    <span class="stat-h-lbl">Học sinh theo dõi</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-blue"><i class="fa-solid fa-graduation-cap"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">${user.childClass || 'Lớp 9A1'}</span>
                    <span class="stat-h-lbl">Khối lớp con đang học</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-green"><i class="fa-solid fa-calendar-check"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">98%</span>
                    <span class="stat-h-lbl">Thời lượng tự học của con</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-purple"><i class="fa-solid fa-bell"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">02</span>
                    <span class="stat-h-lbl">Thông báo từ nhà trường</span>
                </div>
            </div>
        </div>

        <!-- Khối kết nối học sinh con em -->
        <div class="profile-main-card">
            <div class="card-heading"><i class="fa-solid fa-id-card-clip text-orange"></i> Sổ Liên Lạc Điện Tử Con Em</div>
            <div class="parent-child-box">
                <div class="child-avatar-row">
                    <div class="child-icon"><i class="fa-solid fa-user-graduate"></i></div>
                    <div>
                        <h4 style="margin: 0; font-size: 1.15rem; color: #78350f;">Em: ${escapeHTML(user.childName || 'Học sinh demo')}</h4>
                        <span style="font-size: 0.88rem; color: #92400e;">${escapeHTML(user.childClass || 'Lớp 9')} • Trường demo</span>
                    </div>
                </div>
                <div>
                    <a href="user-dashboard.html" class="btn btn-sm btn-outline" style="border-color:#b45309; color:#b45309;">
                        <i class="fa-solid fa-eye"></i> Xem Hồ Sơ Của Con
                    </a>
                </div>
            </div>
        </div>

        <!-- Báo cáo kết quả và nhận xét -->
        <div class="profile-main-card">
            <div class="card-heading"><i class="fa-solid fa-clipboard-check text-green"></i> Tình Hình Học Tập Gần Đây Của Con</div>
            <div class="table-responsive">
                <table class="activity-log-table">
                    <thead>
                        <tr>
                            <th>Môn Học</th>
                            <th>Bài Kiểm Tra</th>
                            <th>Điểm Đạt</th>
                            <th>Nhận Xét Của Giáo Viên</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Toán Học</strong></td>
                            <td>Đề Thi Giữa Kỳ 1</td>
                            <td><strong style="color:#16a34a;">9.5 / 10</strong></td>
                            <td>Em Khôi tiếp thu rất nhanh, giải bài logic và trình bày sạch đẹp. Cần giữ vững phong độ!</td>
                        </tr>
                        <tr>
                            <td><strong>Tiếng Anh</strong></td>
                            <td>Kiểm tra Unit 4</td>
                            <td><strong style="color:#16a34a;">9.0 / 10</strong></td>
                            <td>Phần ngữ pháp và đọc hiểu rất tốt, phản xạ từ vựng linh hoạt.</td>
                        </tr>
                        <tr>
                            <td><strong>Khoa Học Tự Nhiên</strong></td>
                            <td>Thí nghiệm Hóa học</td>
                            <td><strong style="color:#2563eb;">8.5 / 10</strong></td>
                            <td>Chăm chỉ làm bài tập, hăng hái phát biểu xây dựng bài trong lớp.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 4. DÀNH CHO QUẢN TRỊ VIÊN (ADMIN)
function generateAdminOverviewHTML(user) {
    return `
        <!-- Thẻ thống kê quản trị hệ thống -->
        <div class="stat-highlight-cards">
            <div class="stat-h-card">
                <div class="stat-h-icon theme-red"><i class="fa-solid fa-users"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">15,420</span>
                    <span class="stat-h-lbl">Học sinh trong hệ thống</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-blue"><i class="fa-solid fa-file-shield"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">350</span>
                    <span class="stat-h-lbl">Bộ đề thi & kiểm tra</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-green"><i class="fa-solid fa-server"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">99.9%</span>
                    <span class="stat-h-lbl">Thời gian hoạt động (Uptime)</span>
                </div>
            </div>
            <div class="stat-h-card">
                <div class="stat-h-icon theme-purple"><i class="fa-solid fa-shield-halved"></i></div>
                <div class="stat-h-data">
                    <span class="stat-h-val">Super</span>
                    <span class="stat-h-lbl">Cấp độ bảo mật tối đa</span>
                </div>
            </div>
        </div>

        <!-- Phân quyền & Nhiệm vụ quản trị -->
        <div class="profile-main-card">
            <div class="card-heading"><i class="fa-solid fa-key text-red"></i> Quyền Hạn & Phạm Vi Quản Lý</div>
            <div class="info-list" style="margin-bottom: 20px;">
                <div class="info-item">
                    <span class="info-label"><i class="fa-solid fa-shield-virus"></i> Cấp Bậc Quản Trị</span>
                    <span class="info-val">${escapeHTML(user.adminLevel || 'Quản Trị Viên Cấp Cao (Super Admin)')}</span>
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="fa-solid fa-building-columns"></i> Đơn Vị Phụ Trách</span>
                    <span class="info-val">${escapeHTML(user.department || 'Ban Quản Trị & Phát Triển Chương Trình EduTHCS')}</span>
                </div>
                <div class="info-item">
                    <span class="info-label"><i class="fa-solid fa-unlock-keyhole"></i> Quyền Hạn Hệ Thống</span>
                    <span class="info-val">${escapeHTML(user.permissions || 'Toàn quyền kiểm duyệt nội dung, quản lý người dùng, sao lưu cơ sở dữ liệu')}</span>
                </div>
            </div>
            <a href="admin.html" class="btn btn-primary" style="background:#dc2626; border-color:#dc2626;">
                <i class="fa-solid fa-gauge-high"></i> Mở Bảng Điều Khiển Quản Trị Admin
            </a>
        </div>

        <!-- Nhật ký an ninh & hoạt động quản trị gần đây -->
        <div class="profile-main-card">
            <div class="card-heading"><i class="fa-solid fa-clock-rotate-left text-blue"></i> Nhật Ký Quản Trị Gần Đây</div>
            <div class="table-responsive">
                <table class="activity-log-table">
                    <thead>
                        <tr>
                            <th>Thời Gian</th>
                            <th>Hành Động Quản Trị</th>
                            <th>Mục Tiêu</th>
                            <th>Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>14/10/2026 19:20</td>
                            <td>Phê duyệt xuất bản bộ 10 đề thi Toán 9 vào lớp 10</td>
                            <td>Kho Đề Thi Tuyển Sinh</td>
                            <td><span class="role-badge-pill role-badge-teacher">Thành công</span></td>
                        </tr>
                        <tr>
                            <td>14/10/2026 18:45</td>
                            <td>Cập nhật cấu hình phân quyền giáo viên bộ môn KHTN</td>
                            <td>Tài khoản giáo viên</td>
                            <td><span class="role-badge-pill role-badge-teacher">Thành công</span></td>
                        </tr>
                        <tr>
                            <td>14/10/2026 17:30</td>
                            <td>Sao lưu dự phòng định kỳ cơ sở dữ liệu học sinh THCS</td>
                            <td>Hệ thống Database</td>
                            <td><span class="role-badge-pill role-badge-teacher">An Toàn</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

/* ==========================================================
   BỘ CHỌN TÀI KHOẢN (ACCOUNT SWITCHER)
   ========================================================== */
function renderAccountSwitcher(users) {
    const container = document.getElementById('accountSwitcherButtons');
    if (!container) return;

    let html = '';
    users.forEach(u => {
        const isActive = currentViewingUser && (currentViewingUser.username === u.username || currentViewingUser.id === u.id);
        const activeClass = isActive ? 'active' : '';

        let icon = 'fa-user-graduate';
        let roleLabel = 'Học sinh';

        if (u.role === 'admin') {
            icon = 'fa-user-shield';
            roleLabel = 'Admin';
        } else if (u.role === 'teacher') {
            icon = 'fa-chalkboard-user';
            roleLabel = 'Giáo viên';
        } else if (u.role === 'parent') {
            icon = 'fa-users';
            roleLabel = 'Phụ huynh';
        }

        html += `
            <a href="profile.html?username=${encodeURIComponent(u.username)}" class="btn-switch-account ${activeClass}" title="Xem trang cá nhân của ${escapeHTML(u.fullName)}">
                <i class="fa-solid ${icon}"></i>
                <span>${escapeHTML(u.fullName || u.username)}</span>
                <span class="badge-role">${roleLabel}</span>
            </a>
        `;
    });

    container.innerHTML = html;
}

/* ==========================================================
   CHUYỂN TAB TRÊN TRANG CÁ NHÂN
   ========================================================== */
function switchProfileTab(tabName) {
    const tabPanes = document.querySelectorAll('.profile-tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));

    const tabBtns = document.querySelectorAll('.profile-tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    const targetPane = document.getElementById(`tabPane-${tabName}`);
    if (targetPane) targetPane.classList.add('active');

    const clickedBtn = event ? event.currentTarget : null;
    if (clickedBtn && clickedBtn.classList.contains('profile-tab-btn')) {
        clickedBtn.classList.add('active');
    } else {
        const matchingBtn = document.querySelector(`.profile-tab-btn[data-tab="${tabName}"]`);
        if (matchingBtn) matchingBtn.classList.add('active');
    }
}

/* ==========================================================
   ĐIỀN VÀ XỬ LÝ FORM CHỈNH SỬA THÔNG TIN CÁ NHÂN
   ========================================================== */
function populateEditForm(user) {
    const editFullName = document.getElementById('editFullName');
    const editUsername = document.getElementById('editUsername');
    const editEmail = document.getElementById('editEmail');
    const editPhone = document.getElementById('editPhone');
    const editGender = document.getElementById('editGender');
    const editDob = document.getElementById('editDob');
    const editSchool = document.getElementById('editSchool');
    const editAddress = document.getElementById('editAddress');
    const editBio = document.getElementById('editBio');

    if (editFullName) editFullName.value = user.fullName || '';
    if (editUsername) editUsername.value = user.username || '';
    if (editEmail) editEmail.value = user.email || user.username || '';
    if (editPhone) editPhone.value = user.phone || '';
    if (editGender) editGender.value = user.gender || 'Nam';
    if (editDob) editDob.value = user.dob || '';
    if (editSchool) editSchool.value = user.school || '';
    if (editAddress) editAddress.value = user.address || '';
    if (editBio) editBio.value = user.bio || '';
}

function handleSaveProfileSubmit(event) {
    event.preventDefault();
    if (!currentViewingUser) return;

    const editFullName = document.getElementById('editFullName').value.trim();
    const editEmail = document.getElementById('editEmail').value.trim();
    const editPhone = document.getElementById('editPhone').value.trim();
    const editGender = document.getElementById('editGender').value;
    const editDob = document.getElementById('editDob').value;
    const editSchool = document.getElementById('editSchool').value.trim();
    const editAddress = document.getElementById('editAddress').value.trim();
    const editBio = document.getElementById('editBio').value.trim();

    if (!editFullName) {
        showToast('Họ và tên không được để trống!', 'error');
        return;
    }

    const allUsers = getStoredUsers();
    const userInDb = allUsers.find(u => u.username.toLowerCase() === currentViewingUser.username.toLowerCase() || u.id === currentViewingUser.id);

    if (userInDb) {
        userInDb.fullName = editFullName;
        userInDb.email = editEmail;
        userInDb.phone = editPhone;
        userInDb.gender = editGender;
        userInDb.dob = editDob;
        userInDb.school = editSchool;
        userInDb.address = editAddress;
        userInDb.bio = editBio;

        saveStoredUsers(allUsers);
        currentViewingUser = userInDb;

        // Nếu đang sửa chính tài khoản đang đăng nhập, đồng bộ sang eduthcs_user
        if (loggedInUser && (loggedInUser.username === userInDb.username || loggedInUser.id === userInDb.id)) {
            loggedInUser.fullName = userInDb.fullName;
            loggedInUser.school = userInDb.school;
            localStorage.setItem('eduthcs_user', JSON.stringify(loggedInUser));
        }

        renderProfileData();
        renderAccountSwitcher(allUsers);
        showToast('🎉 Cập nhật thông tin cá nhân thành công!', 'success');
        switchProfileTab('overview');
    } else {
        showToast('Không tìm thấy tài khoản để cập nhật!', 'error');
    }
}

/* ==========================================================
   ĐỔI MẬT KHẨU TÀI KHOẢN
   ========================================================== */
function setupPasswordStrengthMeter() {
    const newPwdInput = document.getElementById('pwdNewInput');
    if (!newPwdInput) return;

    newPwdInput.addEventListener('input', () => {
        const val = newPwdInput.value;
        const fill = document.getElementById('pwdStrengthBar');
        const text = document.getElementById('pwdStrengthMsg');
        if (!fill || !text) return;

        if (!val) {
            fill.style.width = '0%';
            fill.style.backgroundColor = '#e2e8f0';
            text.innerText = 'Độ bảo mật: Chưa nhập';
            text.style.color = '#64748b';
            return;
        }

        let score = 0;
        if (val.length >= 6) score += 1;
        if (val.length >= 8) score += 1;
        if (/[A-Z]/.test(val)) score += 1;
        if (/[0-9]/.test(val)) score += 1;
        if (/[^A-Za-z0-9]/.test(val)) score += 1;

        if (score <= 2) {
            fill.style.width = '35%';
            fill.style.backgroundColor = '#ef4444';
            text.innerText = 'Độ bảo mật: Yếu (Nên thêm số hoặc ký tự đặc biệt)';
            text.style.color = '#ef4444';
        } else if (score <= 4) {
            fill.style.width = '70%';
            fill.style.backgroundColor = '#f59e0b';
            text.innerText = 'Độ bảo mật: Tương đối tốt';
            text.style.color = '#f59e0b';
        } else {
            fill.style.width = '100%';
            fill.style.backgroundColor = '#10b981';
            text.innerText = 'Độ bảo mật: Rất mạnh và an toàn';
            text.style.color = '#10b981';
        }
    });
}

function handleChangePasswordSubmit(event) {
    event.preventDefault();
    if (!currentViewingUser) return;

    const oldPwd = document.getElementById('pwdOldInput').value.trim();
    const newPwd = document.getElementById('pwdNewInput').value.trim();
    const confirmPwd = document.getElementById('pwdConfirmInput').value.trim();

    if (newPwd.length < 6) {
        showToast('Mật khẩu mới phải có tối thiểu 6 ký tự!', 'error');
        return;
    }

    if (newPwd !== confirmPwd) {
        showToast('Mật khẩu xác nhận không trùng khớp!', 'error');
        return;
    }

    const allUsers = getStoredUsers();
    const userInDb = allUsers.find(u => u.username.toLowerCase() === currentViewingUser.username.toLowerCase() || u.id === currentViewingUser.id);

    if (userInDb) {
        // Kiểm tra mật khẩu cũ nếu có
        if (!oldPwd || !userInDb.password || userInDb.password !== oldPwd) {
            showToast('Mật khẩu hiện tại không chính xác!', 'error');
            return;
        }

        userInDb.password = newPwd;
        saveStoredUsers(allUsers);
        currentViewingUser.password = newPwd;

        document.getElementById('changePasswordForm').reset();
        setupPasswordStrengthMeter();
        showToast('🎉 Đổi mật khẩu thành công! Hãy lưu nhớ mật khẩu mới.', 'success');
        switchProfileTab('overview');
    } else {
        showToast('Không tìm thấy tài khoản để đổi mật khẩu!', 'error');
    }
}

/* ==========================================================
   HÀNH ĐỘNG ĐĂNG NHẬP NHANH BẰNG TÀI KHOẢN ĐANG XEM
   ========================================================== */
function handleLoginAsCurrentViewingUser() {
    if (!currentViewingUser) return;
    const u = currentViewingUser;

    localStorage.setItem('eduthcs_user', JSON.stringify({
        id: u.id,
        username: u.username,
        fullName: u.fullName,
        role: u.role,
        roleName: u.roleName,
        school: u.school,
        loginTime: new Date().toISOString()
    }));

    showToast(`Đã chuyển đổi đăng nhập sang "${u.fullName}"! Đang tải lại...`, 'success');

    setTimeout(() => {
        window.location.href = `profile.html?username=${encodeURIComponent(u.username)}`;
    }, 700);
}

function handleUserLogout() {
    if (confirm('Bạn có muốn đăng xuất khỏi tài khoản không?')) {
        localStorage.removeItem('eduthcs_user');
        window.location.href = 'login.html';
    }
}

/* ==========================================================
   TIỆN ÍCH HỖ TRỢ (HELPERS)
   ========================================================== */
function setTextContent(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) el.innerText = text;
}

function formatDateVi(dateStr) {
    if (!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    } catch(e) {
        return dateStr;
    }
}

function showToast(message, type = 'info') {
    const toastBox = document.getElementById('toastNotification');
    if (!toastBox) return;

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;

    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-circle-xmark';

    toast.innerHTML = `
        <i class="fa-solid ${iconClass} toast-icon"></i>
        <div class="toast-text">${message}</div>
    `;

    toastBox.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.35s ease';
        setTimeout(() => toast.remove(), 350);
    }, 3500);
}

function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

/**
 * EduTHCS - Kịch bản Quản Trị Hệ Thống (Admin Management Logic)
 */

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    loadUsersTable();
});

function checkAdminAuth() {
    const loggedUser = JSON.parse(localStorage.getItem('eduthcs_user') || 'null');
    const adminNameElem = document.getElementById('currentAdminName');

    if (loggedUser) {
        if (loggedUser.role === 'admin' && adminNameElem) {
            adminNameElem.innerText = loggedUser.fullName || 'Quản trị viên demo';
        }
    }
}

function switchAdminTab(tabName) {
    const tabs = document.querySelectorAll('.admin-tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) targetTab.classList.add('active');

    // Active button in sidebar
    const clickedItem = event ? event.currentTarget : null;
    if (clickedItem && clickedItem.classList.contains('nav-item')) {
        clickedItem.classList.add('active');
    }
}

/* ==========================================================
   QUẢN LÝ TÀI KHOẢN (USER MANAGEMENT)
   ========================================================== */
function loadUsersTable() {
    const users = getStoredUsers();
    renderUserTableRows(users);

    // Cập nhật số lượng tài khoản trên sidebar
    const countBadge = document.getElementById('userCountBadge');
    if (countBadge) countBadge.innerText = users.length;
}

function renderUserTableRows(users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    if (!users.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 30px; color: #94a3b8;">Không tìm thấy tài khoản nào!</td></tr>`;
        return;
    }

    let html = '';
    users.forEach((user, index) => {
        let roleBadgeClass = 'role-student';
        let roleDisplayName = 'Học sinh Cấp 2';
        let avatarBg = '#2563eb';
        let avatarIcon = 'fa-user-graduate';

        if (user.role === 'admin') {
            roleBadgeClass = 'role-admin';
            roleDisplayName = 'Quản Trị Viên (Admin)';
            avatarBg = '#dc2626';
            avatarIcon = 'fa-user-shield';
        } else if (user.role === 'teacher') {
            roleBadgeClass = 'role-teacher';
            roleDisplayName = 'Giáo Viên THCS';
            avatarBg = '#16a34a';
            avatarIcon = 'fa-chalkboard-user';
        } else if (user.role === 'parent') {
            roleBadgeClass = 'role-parent';
            roleDisplayName = 'Phụ Huynh';
            avatarBg = '#d97706';
            avatarIcon = 'fa-users';
        }

        html += `
            <tr id="user-row-${index}">
                <td>
                    <div class="user-cell">
                        <div class="user-cell-avatar" style="background-color: ${avatarBg};">
                            <i class="fa-solid ${avatarIcon}"></i>
                        </div>
                        <div class="user-cell-info">
                            <strong>${escapeHTML(user.fullName || 'Người dùng')}</strong>
                            <span>${user.school || user.roleName || ''}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <code>${escapeHTML(user.username)}</code>
                </td>
                <td>
                    <span class="pwd-preview">Không hiển thị</span>
                </td>
                <td>
                    <span class="role-tag ${roleBadgeClass}">${roleDisplayName}</span>
                </td>
                <td>
                    <span class="status-dot">Hoạt động</span>
                </td>
                <td>
                    <div class="table-actions">
                        <a href="profile.html?username=${encodeURIComponent(user.username)}" class="btn-action" title="Xem trang cá nhân tài khoản này" style="text-decoration:none; display:inline-flex; align-items:center; justify-content:center;">
                            <i class="fa-solid fa-id-badge" style="color:#2563eb;"></i>
                        </a>
                        <button class="btn-action" title="Đăng nhập thử tài khoản này" onclick="loginAsUser('${user.username}')">
                            <i class="fa-solid fa-arrow-right-to-bracket"></i>
                        </button>
                        ${user.role !== 'admin' ? `
                            <button class="btn-action btn-delete" title="Xóa tài khoản" onclick="deleteUser('${user.username}')">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        ` : `
                            <button class="btn-action" title="Tài khoản Quản trị mặc định" disabled style="opacity: 0.5;">
                                <i class="fa-solid fa-lock"></i>
                            </button>
                        `}
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function filterUserTable() {
    const searchInput = document.getElementById('userSearchInput');
    const roleSelect = document.getElementById('roleFilterSelect');

    const filterText = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const filterRole = roleSelect ? roleSelect.value : 'all';

    const allUsers = getStoredUsers();
    const filtered = allUsers.filter(u => {
        const matchText = (u.fullName || '').toLowerCase().includes(filterText) || 
                          (u.username || '').toLowerCase().includes(filterText) ||
                          (u.roleName || '').toLowerCase().includes(filterText);
        const matchRole = filterRole === 'all' || u.role === filterRole;
        return matchText && matchRole;
    });

    renderUserTableRows(filtered);
}

/* ==========================================================
   THÊM & XÓA TÀI KHOẢN
   ========================================================== */
function showAddUserModal() {
    const modal = document.getElementById('addUserModal');
    if (modal) modal.classList.add('active');
}

function closeAddUserModal() {
    const modal = document.getElementById('addUserModal');
    if (modal) modal.classList.remove('active');
}

function handleAddNewUser(event) {
    event.preventDefault();
    const fullName = document.getElementById('newFullName').value.trim();
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    const role = document.getElementById('newRole').value;

    if (!fullName || !username || !password) {
        alert('Vui lòng điền đầy đủ các thông tin bắt buộc!');
        return;
    }

    const users = getStoredUsers();

    // Kiểm tra trùng username
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        alert('Tài khoản/Email này đã tồn tại trên hệ thống!');
        return;
    }

    let roleName = 'Học Sinh Cấp 2';
    if (role === 'admin') roleName = 'Quản Trị Viên';
    if (role === 'teacher') roleName = 'Giáo Viên THCS';
    if (role === 'parent') roleName = 'Phụ Huynh Học Sinh';

    const newUser = {
        id: 'acc_' + Date.now(),
        username: username,
        password: password,
        fullName: fullName,
        role: role,
        roleName: roleName,
        school: role === 'student' ? 'Học sinh THCS' : '',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveStoredUsers(users);

    closeAddUserModal();
    loadUsersTable();
    showToast(`Đã thêm thành công tài khoản: ${fullName} (${roleName})!`, 'success');

    // Reset form
    document.getElementById('addUserForm').reset();
}

function deleteUser(username) {
    if (confirm(`Bạn có chắc chắn muốn xóa tài khoản "${username}" không?`)) {
        let users = getStoredUsers();
        users = users.filter(u => u.username !== username);
        saveStoredUsers(users);
        loadUsersTable();
        showToast(`Đã xóa tài khoản "${username}" thành công!`, 'info');
    }
}

function loginAsUser(username) {
    const users = getStoredUsers();
    const user = users.find(u => u.username === username);
    if (!user) return;

    localStorage.setItem('eduthcs_user', JSON.stringify({
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        roleName: user.roleName,
        school: user.school,
        loginTime: new Date().toISOString()
    }));

    showToast(`Đang chuyển đổi đăng nhập sang "${user.fullName}"...`, 'success');

    setTimeout(() => {
        if (user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'user-dashboard.html';
        }
    }, 700);
}

function handleLogout() {
    if (confirm('Bạn có muốn đăng xuất khỏi hệ thống không?')) {
        localStorage.removeItem('eduthcs_user');
        window.location.href = 'login.html';
    }
}

/**
 * IBEM CURSOS E PROFISSÕES — PLATAFORMA DE ESTUDOS
 * "Pensou em cursos, pense IBEM, faça IBEM"
 * Sistema Enxuto com Controle Manual do Administrador
 */

// =============================================================================
// 1. BANCO DE CURSOS E MÓDULOS OFICIAIS
// =============================================================================
const ibemCoursesDatabase = {
  'prof-info': {
    id: 'prof-info',
    title: 'Informática Básica e Avançada',
    workload: '12 meses',
    type: 'Profissionalizante',
    modules: [
      { id: 1, order: 1, title: 'Fundamentos de TI, Windows e Digitação', duration: '3 meses', lessons: 5, desc: 'Ambiente operacional, navegação segura, digitação profissional e gestão de arquivos.' },
      { id: 2, order: 2, title: 'Pacote Office Empresarial (Word, Excel e PPT)', duration: '3 meses', lessons: 4, desc: 'Formatação de relatórios corporativos, fórmulas práticas no Excel e apresentações.' },
      { id: 3, order: 3, title: 'Montagem, Manutenção e Configuração de Redes', duration: '3 meses', lessons: 4, desc: 'Arquitetura de hardware, formatação, troca de componentes e redes Wi-Fi.' },
      { id: 4, order: 4, title: 'Inteligência Artificial e Tecnologias Modernas', duration: '3 meses', lessons: 4, desc: 'Uso de inteligência artificial no trabalho diário, produtividade e nuvem.' }
    ]
  },
  'prof-adm': {
    id: 'prof-adm',
    title: 'Pacote Administrativo',
    workload: '10 meses',
    type: 'Profissionalizante',
    modules: [
      { id: 1, order: 1, title: 'Rotinas de Assistente e Recepção', duration: '2.5 meses', lessons: 4, desc: 'Atendimento corporativo, postura profissional, controle de correspondência e recepção.' },
      { id: 2, order: 2, title: 'Contabilidade Básica e Folha de Pagamento', duration: '2.5 meses', lessons: 4, desc: 'Lançamentos contábeis, notas fiscais, cálculos trabalhistas e controle de caixa.' },
      { id: 3, order: 3, title: 'Comunicação Empresarial e Redação Técnica', duration: '2.5 meses', lessons: 4, desc: 'E-mails corporativos, oratória, relatórios formais e linguagem executiva.' },
      { id: 4, order: 4, title: 'Gestão Comercial, Vendas e Atendimento', duration: '2.5 meses', lessons: 4, desc: 'Técnicas de negociação, CRM comercial e fidelização de clientes.' }
    ]
  },
  'tec-ds': {
    id: 'tec-ds',
    title: 'Técnico em Desenvolvimento de Sistemas',
    workload: '1440h',
    type: 'Técnico',
    modules: [
      { id: 1, order: 1, title: 'Lógica de Programação e Algoritmos', duration: '360h', lessons: 5, desc: 'Variáveis, condicionais, laços de repetição, funções e resolução prática de problemas.' },
      { id: 2, order: 2, title: 'Modelagem de Software e Banco de Dados (SQL)', duration: '360h', lessons: 4, desc: 'Diagramas de caso de uso, DER, modelagem relacional e comandos SQL.' },
      { id: 3, order: 3, title: 'Desenvolvimento Web Moderno e APIs RESTful', duration: '360h', lessons: 4, desc: 'HTML5 semântico, CSS3, JavaScript assíncrono e microsserviços.' },
      { id: 4, order: 4, title: 'Engenharia de Software e Projeto Integrador', duration: '360h', lessons: 4, desc: 'Metodologias ágeis (Scrum), versionamento Git, testes e deploy.' }
    ]
  },
  'tec-seg': {
    id: 'tec-seg',
    title: 'Técnico em Segurança do Trabalho',
    workload: '1440h',
    type: 'Técnico',
    modules: [
      { id: 1, order: 1, title: 'Introdução às Normas Regulamentadoras (NRs)', duration: '360h', lessons: 4, desc: 'Legislação trabalhista, histórico da segurança no Brasil e diretrizes das NRs.' },
      { id: 2, order: 2, title: 'Ergonomia e Higiene Ocupacional', duration: '360h', lessons: 4, desc: 'Riscos físicos, químicos e biológicos no ambiente de trabalho e avaliação postural.' },
      { id: 3, order: 3, title: 'Prevenção e Combate a Sinistros', duration: '360h', lessons: 4, desc: 'Planos de emergência, equipamentos de combate a incêndio e primeiros socorros.' },
      { id: 4, order: 4, title: 'Perícias Técnicas e Elaboração de Laudos', duration: '360h', lessons: 4, desc: 'PGR, PCMSO, LTCAT e documentação probatória para conformidade legal.' }
    ]
  },
  'tec-eletro': {
    id: 'tec-eletro',
    title: 'Técnico em Eletrotécnica',
    workload: '1440h',
    type: 'Técnico',
    modules: [
      { id: 1, order: 1, title: 'Circuitos Elétricos e Medições', duration: '360h', lessons: 4, desc: 'Leis de Kirchhoff, grandezas elétricas e medições com multímetro.' },
      { id: 2, order: 2, title: 'Comandos Elétricos e Diagramas Unifilares', duration: '360h', lessons: 4, desc: 'Contatores, relés térmicos, chaves de partida e diagramas industriais.' },
      { id: 3, order: 3, title: 'Subestações e Redes de Distribuição', duration: '360h', lessons: 4, desc: 'Transformadores de potência, isolamento e redes aéreas de média tensão.' },
      { id: 4, order: 4, title: 'Instalações Industriais e Automação', duration: '360h', lessons: 4, desc: 'Controladores lógicos (CLP), inversores de frequência e acionamentos.' }
    ]
  }
};

// =============================================================================
// 2. PERSISTÊNCIA LOCAL (LOCALSTORAGE)
// =============================================================================
const STORAGE_KEYS = {
  STUDENTS: 'ibem_simple_students_v4',
  ACTIVE_STUDENT_ID: 'ibem_simple_active_student_v4'
};

const initialStudents = [
  {
    id: 1,
    name: 'Lucas Fernandes',
    email: 'aluno@ibem.edu.br',
    password: '123456',
    courseId: 'tec-ds',
    unlockedModules: [1], // Admin liberou apenas o Módulo 1 inicialmente
    status: 'Ativo'
  },
  {
    id: 2,
    name: 'Mariana Duarte',
    email: 'mariana.duarte@ibem.edu.br',
    password: '123456',
    courseId: 'tec-seg',
    unlockedModules: [1, 2], // Admin liberou Módulos 1 e 2
    status: 'Ativo'
  },
  {
    id: 3,
    name: 'Gabriel Siqueira',
    email: 'gabriel.s@ibem.edu.br',
    password: '123456',
    courseId: 'prof-info',
    unlockedModules: [1], // Admin liberou apenas Módulo 1
    status: 'Ativo'
  },
  {
    id: 4,
    name: 'Beatriz Silveira',
    email: 'beatriz.silveira@ibem.edu.br',
    password: '123456',
    courseId: 'prof-adm',
    unlockedModules: [1], // Admin liberou apenas Módulo 1
    status: 'Ativo'
  }
];

function getStoredData(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStoredData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Erro ao gravar no localStorage:', e);
  }
}

const state = {
  students: getStoredData(STORAGE_KEYS.STUDENTS, initialStudents),
  activeStudentId: getStoredData(STORAGE_KEYS.ACTIVE_STUDENT_ID, 1)
};

// =============================================================================
// 3. INICIALIZADOR DE PÁGINAS
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // admin.html
  if (document.getElementById('studentsTableBody')) {
    initAdminPage();
  }

  // aluno.html
  if (document.getElementById('studentModulesTrack')) {
    initStudentPage();
  }

  // aula.html
  if (document.getElementById('quiz-tf')) {
    initClassroomPage();
  }
});

// =============================================================================
// 4. PÁGINA DE LOGIN (INDEX.HTML)
// =============================================================================
function processLogin() {
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';

  if (!email) {
    alert('Por favor, informe seu e-mail de acesso.');
    return;
  }

  showToast('Identificando perfil no IBEM...');

  setTimeout(() => {
    // Acesso do Administrador
    if (email.includes('admin') || email.includes('coordenacao')) {
      showToast('Acesso autorizado: Painel do Administrador.');
      window.location.href = 'admin.html';
      return;
    }

    // Acesso do Aluno
    const foundStudent = state.students.find(s => s.email.toLowerCase() === email);
    if (foundStudent) {
      state.activeStudentId = foundStudent.id;
      setStoredData(STORAGE_KEYS.ACTIVE_STUDENT_ID, foundStudent.id);
      showToast(`Bem-vindo(a), ${foundStudent.name}! Abrindo suas aulas...`);
      window.location.href = 'aluno.html';
    } else {
      alert('Aluno não localizado no sistema. As matrículas são realizadas presencialmente na escola IBEM ou via WhatsApp com a secretaria.');
    }
  }, 350);
}

// =============================================================================
// 5. PAINEL DO ADMINISTRADOR (ADMIN.HTML) — APENAS AS 2 FUNÇÕES
// =============================================================================

function initAdminPage() {
  setupAdminTabs();
  renderStudentsTable();
  renderModuleControlCards();
  populateCourseSelect();
}

function setupAdminTabs() {
  const tabs = document.querySelectorAll('.subnav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabKey = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      const targetPane = document.getElementById(`pane-${tabKey}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

function populateCourseSelect() {
  const studentSelect = document.getElementById('formStudentCourse');
  const lessonSelect = document.getElementById('formLessonCourse');

  if (studentSelect) {
    studentSelect.innerHTML = '';
    Object.values(ibemCoursesDatabase).forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.title} (${c.workload})`;
      studentSelect.appendChild(opt);
    });
  }

  if (lessonSelect) {
    lessonSelect.innerHTML = '';
    Object.values(ibemCoursesDatabase).forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.title;
      lessonSelect.appendChild(opt);
    });
  }
}

// Checkboxes dinâmicos de módulos para o modal de cadastro
function updateCourseModuleCheckboxes(courseId, checkedModuleIds = [1]) {
  const container = document.getElementById('moduleCheckboxesContainer');
  if (!container) return;

  container.innerHTML = '';
  const course = ibemCoursesDatabase[courseId];
  if (!course) return;

  course.modules.forEach(mod => {
    const isChecked = checkedModuleIds.includes(mod.id);
    const label = document.createElement('label');
    label.className = 'checkbox-module-item';
    label.innerHTML = `
      <input type="checkbox" name="unlockedModule" value="${mod.id}" ${isChecked ? 'checked' : ''}>
      <span><strong>Módulo ${mod.order}:</strong> ${escapeHtml(mod.title)}</span>
    `;
    container.appendChild(label);
  });
}

function onCourseSelectChanged() {
  const select = document.getElementById('formStudentCourse');
  if (select) {
    updateCourseModuleCheckboxes(select.value, [1]);
  }
}

// FUNÇÃO A: CADASTRAR OU EDITAR ALUNO (NOME, E-MAIL, SENHA E CURSO)
function openStudentModal(studentId = null) {
  const modal = document.getElementById('studentModal');
  const title = document.getElementById('modalStudentTitle');
  const editId = document.getElementById('studentEditId');
  const nameInput = document.getElementById('formStudentName');
  const emailInput = document.getElementById('formStudentEmail');
  const passInput = document.getElementById('formStudentPassword');
  const courseSelect = document.getElementById('formStudentCourse');

  populateCourseSelect();

  if (studentId) {
    const student = state.students.find(s => s.id === studentId);
    if (student) {
      title.textContent = 'Editar Cadastro e Permissões do Aluno';
      editId.value = student.id;
      nameInput.value = student.name;
      emailInput.value = student.email;
      passInput.value = student.password || '123456';
      if (courseSelect) courseSelect.value = student.courseId;
      updateCourseModuleCheckboxes(student.courseId, student.unlockedModules || [1]);
    }
  } else {
    title.textContent = 'Cadastrar Novo Aluno e Definir Curso';
    editId.value = '';
    nameInput.value = '';
    emailInput.value = '';
    passInput.value = '123456';
    if (courseSelect) {
      courseSelect.value = 'prof-info';
      updateCourseModuleCheckboxes('prof-info', [1]); // Módulo 1 marcado por padrão
    }
  }

  modal.classList.add('open');
}

function closeStudentModal() {
  const modal = document.getElementById('studentModal');
  if (modal) modal.classList.remove('open');
}

function saveStudent() {
  const editId = document.getElementById('studentEditId').value;
  const name = document.getElementById('formStudentName').value.trim();
  const email = document.getElementById('formStudentEmail').value.trim();
  const password = document.getElementById('formStudentPassword').value.trim();
  const courseId = document.getElementById('formStudentCourse').value;

  if (!name || !email) {
    alert('Preencha pelo menos o Nome Completo e o E-mail do aluno.');
    return;
  }

  const checkedBoxes = document.querySelectorAll('input[name="unlockedModule"]:checked');
  const unlockedModules = Array.from(checkedBoxes).map(cb => parseInt(cb.value, 10));

  if (editId) {
    const student = state.students.find(s => s.id === parseInt(editId, 10));
    if (student) {
      student.name = name;
      student.email = email;
      student.password = password || '123456';
      student.courseId = courseId;
      student.unlockedModules = unlockedModules.length > 0 ? unlockedModules : [1];
      showToast(`Cadastro e permissões de ${name} atualizados com sucesso!`);
    }
  } else {
    const newStudent = {
      id: Date.now(),
      name,
      email,
      password: password || '123456',
      courseId,
      unlockedModules: unlockedModules.length > 0 ? unlockedModules : [1],
      status: 'Ativo'
    };
    state.students.unshift(newStudent);
    showToast(`Aluno ${name} cadastrado no curso ${ibemCoursesDatabase[courseId]?.title || ''}!`);
  }

  setStoredData(STORAGE_KEYS.STUDENTS, state.students);
  closeStudentModal();
  renderStudentsTable();
  renderModuleControlCards();
}

function deleteStudent(id) {
  const student = state.students.find(s => s.id === id);
  if (!student) return;

  if (confirm(`Remover o cadastro do aluno "${student.name}" do sistema?`)) {
    state.students = state.students.filter(s => s.id !== id);
    setStoredData(STORAGE_KEYS.STUDENTS, state.students);
    showToast(`Matrícula de ${student.name} removida.`);
    renderStudentsTable();
    renderModuleControlCards();
  }
}

// Renderiza a Tabela de Alunos da Aba 1
function renderStudentsTable(filterText = '') {
  const tbody = document.getElementById('studentsTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const search = filterText.toLowerCase().trim();

  const filtered = state.students.filter(s => {
    return s.name.toLowerCase().includes(search) || s.email.toLowerCase().includes(search);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:24px; color:var(--text-muted);">Nenhum aluno encontrado.</td></tr>`;
    return;
  }

  filtered.forEach(s => {
    const course = ibemCoursesDatabase[s.courseId] || { title: 'Curso Geral', modules: [] };
    const unlocked = s.unlockedModules || [];
    const total = course.modules.length || 4;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(s.name)}</strong></td>
      <td>
        <div style="font-size:0.82rem; color:var(--text-body);">${escapeHtml(s.email)}</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">Senha: <code>${escapeHtml(s.password || '123456')}</code></div>
      </td>
      <td>
        <span class="course-badge-highlight" title="${escapeHtml(course.title)}">
          ${escapeHtml(course.title)}
        </span>
      </td>
      <td>
        <span style="font-weight:700; color:var(--ibem-navy); font-size:0.82rem;">
          ${unlocked.length} de ${total} módulos liberados
        </span>
        <div style="font-size:0.75rem; color:var(--text-muted);">
          ${unlocked.map(m => `M${m}`).join(', ') || 'Nenhum'}
        </div>
      </td>
      <td class="text-right">
        <button class="btn btn-secondary btn-sm" onclick="switchToModuleControl(${s.id})">
          🔓 Liberar Módulos
        </button>
        <button class="btn btn-secondary btn-sm" onclick="openStudentModal(${s.id})">Editar</button>
        <button class="btn btn-danger-outline btn-sm" onclick="deleteStudent(${s.id})">Remover</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterStudents() {
  const searchInput = document.getElementById('searchStudentInput');
  const text = searchInput ? searchInput.value : '';
  renderStudentsTable(text);
}

// FUNÇÃO B: CONTROLE DE MÓDULOS (LIBERAÇÃO MANUAL COM BOTÃO DIRETO)
function renderModuleControlCards() {
  const container = document.getElementById('moduleControlContainer');
  if (!container) return;

  container.innerHTML = '';

  if (state.students.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">Nenhum aluno cadastrado.</div>`;
    return;
  }

  state.students.forEach(student => {
    const course = ibemCoursesDatabase[student.courseId] || ibemCoursesDatabase['prof-info'];
    const card = document.createElement('div');
    card.className = 'student-control-card';
    card.id = `control-student-${student.id}`;

    // Cabeçalho do Card
    const header = document.createElement('div');
    header.className = 'student-control-header';
    header.innerHTML = `
      <div>
        <span class="student-control-name">${escapeHtml(student.name)}</span>
        <span style="font-size:0.8rem; color:var(--text-muted); margin-left:8px;">(${escapeHtml(student.email)})</span>
      </div>
      <div>
        <span class="course-badge-highlight">Curso: ${escapeHtml(course.title)}</span>
      </div>
    `;

    // Lista de Módulos com Botões de Liberação Manual
    const modulesList = document.createElement('div');
    modulesList.className = 'student-control-modules-list';

    course.modules.forEach(mod => {
      const isUnlocked = (student.unlockedModules || []).includes(mod.id);
      const row = document.createElement('div');
      row.className = `student-module-row ${isUnlocked ? 'unlocked' : 'locked'}`;

      row.innerHTML = `
        <div class="module-row-left">
          <span class="module-status-badge ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}">
            ${isUnlocked ? 'Liberado ✓' : '🔒 Bloqueado com Cadeado'}
          </span>
          <span class="module-row-title">Módulo ${mod.order}: ${escapeHtml(mod.title)}</span>
        </div>
        <div>
          ${isUnlocked ? `
            <button type="button" class="btn btn-secondary btn-sm" onclick="manualLockModule(${student.id}, ${mod.id})" title="Bloquear este módulo para o aluno">
              Bloquear 🔒
            </button>
          ` : `
            <button type="button" class="btn btn-primary btn-sm" onclick="manualUnlockModule(${student.id}, ${mod.id})" title="Tirar o cadeado e liberar acesso ao aluno">
              🔓 Liberar Módulo ${mod.order} para este Aluno
            </button>
          `}
        </div>
      `;

      modulesList.appendChild(row);
    });

    card.appendChild(header);
    card.appendChild(modulesList);
    container.appendChild(card);
  });
}

// AÇÃO MANUAL: Tira o cadeado da tela do aluno
function manualUnlockModule(studentId, moduleId) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  if (!student.unlockedModules) student.unlockedModules = [];
  if (!student.unlockedModules.includes(moduleId)) {
    student.unlockedModules.push(moduleId);
    student.unlockedModules.sort((a, b) => a - b);
  }

  setStoredData(STORAGE_KEYS.STUDENTS, state.students);
  renderModuleControlCards();
  renderStudentsTable();

  showToast(`🔓 Módulo ${moduleId} liberado para ${student.name}! O cadeado foi removido.`);
}

// AÇÃO MANUAL: Bloqueia o módulo caso necessário
function manualLockModule(studentId, moduleId) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  if (student.unlockedModules) {
    student.unlockedModules = student.unlockedModules.filter(m => m !== moduleId);
  }

  setStoredData(STORAGE_KEYS.STUDENTS, state.students);
  renderModuleControlCards();
  renderStudentsTable();

  showToast(`🔒 Módulo ${moduleId} bloqueado para ${student.name}.`);
}

function switchToModuleControl(studentId) {
  const tabBtn = document.getElementById('tabAdminModulos');
  if (tabBtn) tabBtn.click();

  setTimeout(() => {
    const card = document.getElementById(`control-student-${studentId}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.borderColor = 'var(--ibem-blue-primary)';
      card.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.2)';
      setTimeout(() => {
        card.style.borderColor = '';
        card.style.boxShadow = '';
      }, 1600);
    }
  }, 100);
}

// Adicionar Aulas aos Módulos
function openLessonModal() {
  populateCourseSelect();
  const modal = document.getElementById('lessonModal');
  if (modal) modal.classList.add('open');
}

function closeLessonModal() {
  const modal = document.getElementById('lessonModal');
  if (modal) modal.classList.remove('open');
}

function saveLesson() {
  const courseId = document.getElementById('formLessonCourse').value;
  const modOrder = parseInt(document.getElementById('formLessonModule').value, 10);
  const title = document.getElementById('formLessonTitle').value.trim();

  if (!title) {
    alert('Informe o título da aula.');
    return;
  }

  const course = ibemCoursesDatabase[courseId];
  if (course) {
    const mod = course.modules.find(m => m.order === modOrder);
    if (mod) {
      mod.lessons = (mod.lessons || 4) + 1;
    }
  }

  closeLessonModal();
  showToast(`Nova aula cadastrada no Módulo ${modOrder}!`);
}

// =============================================================================
// 6. DASHBOARD DO ALUNO (ALUNO.HTML) — EXCLUSIVAMENTE O CURSO SELECIONADO
// =============================================================================

function initStudentPage() {
  // Identifica o aluno ativo
  let activeStudent = state.students.find(s => s.id === state.activeStudentId);
  if (!activeStudent && state.students.length > 0) {
    activeStudent = state.students[0];
    state.activeStudentId = activeStudent.id;
    setStoredData(STORAGE_KEYS.ACTIVE_STUDENT_ID, activeStudent.id);
  }

  if (!activeStudent) return;

  // Barra de alternância para o usuário testar diferentes perfis
  renderStudentSwitcher(activeStudent);

  // Lê ESTRITAMENTE o curso que o admin cadastrou para este aluno
  const studentCourse = ibemCoursesDatabase[activeStudent.courseId] || ibemCoursesDatabase['prof-info'];

  // Atualiza identificação
  const nameEl = document.getElementById('studentDisplayName');
  const courseBadgeEl = document.getElementById('studentEnrolledCourseBadge');
  if (nameEl) nameEl.textContent = activeStudent.name;
  if (courseBadgeEl) {
    courseBadgeEl.textContent = `Curso Oficial: ${studentCourse.title} (${studentCourse.workload})`;
  }

  // Progresso
  const unlocked = activeStudent.unlockedModules || [1];
  const total = studentCourse.modules.length;
  const pct = Math.round((unlocked.length / total) * 100);

  const pctEl = document.getElementById('studentProgressPct');
  const barEl = document.getElementById('studentProgressBar');
  const statEl = document.getElementById('studentModulesStat');
  const capEl = document.getElementById('studentProgressCaption');

  if (pctEl) pctEl.textContent = studentCourse.title;
  if (barEl) barEl.style.width = `${pct}%`;
  if (statEl) statEl.textContent = `${unlocked.length} de ${total}`;
  if (capEl) capEl.textContent = `${unlocked.length} de ${total} módulos liberados pelo administrador`;

  // Renderiza a Trilha: Aulas liberadas vs Módulos com CADEADO
  renderStudentCourseTrack(studentCourse, unlocked);
}

function renderStudentSwitcher(activeStudent) {
  const container = document.getElementById('studentSwitcherContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="student-switcher-bar">
      <div>
        <span style="font-weight:600; color:var(--ibem-navy);">Perfil Conectado:</span>
        <strong style="color:var(--ibem-blue-deep); margin-left:4px;">${escapeHtml(activeStudent.name)}</strong>
      </div>
      <div class="student-switcher-controls">
        <label for="studentProfileSelect" style="font-size:0.78rem; color:var(--text-muted);">Simular outro aluno:</label>
        <select id="studentProfileSelect" class="form-select" style="padding:4px 8px; font-size:0.8rem;" onchange="changeActiveStudent(this.value)">
          ${state.students.map(s => `
            <option value="${s.id}" ${s.id === activeStudent.id ? 'selected' : ''}>
              ${s.name} — ${ibemCoursesDatabase[s.courseId]?.title || 'Curso'}
            </option>
          `).join('')}
        </select>
      </div>
    </div>
  `;
}

function changeActiveStudent(studentId) {
  const id = parseInt(studentId, 10);
  state.activeStudentId = id;
  setStoredData(STORAGE_KEYS.ACTIVE_STUDENT_ID, id);
  initStudentPage();
  showToast('Painel atualizado para o aluno selecionado.');
}

// Renderização Estrita da Trilha: Liberado vs Cadeado
function renderStudentCourseTrack(course, unlockedModules) {
  const trackContainer = document.getElementById('studentModulesTrack');
  if (!trackContainer) return;

  trackContainer.innerHTML = '';

  course.modules.forEach(mod => {
    const isUnlocked = unlockedModules.includes(mod.id);
    const card = document.createElement('div');

    if (isUnlocked) {
      // MÓDULO LIBERADO PELO ADMINISTRADOR
      card.className = 'track-card status-in-progress';
      card.innerHTML = `
        <div class="track-status-icon play-icon" aria-label="Acesso Liberado">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
        <div class="track-details">
          <div class="track-badge-row">
            <span class="track-step">Módulo ${mod.order}</span>
            <span class="badge-status-progress">Liberado pelo Administrador ✓</span>
          </div>
          <h3 class="track-title">${escapeHtml(mod.title)}</h3>
          <p class="track-meta">${escapeHtml(mod.desc)} • Carga: ${mod.duration}</p>
        </div>
        <div class="track-action">
          <a href="aula.html" class="btn btn-primary btn-sm" style="text-decoration:none;">
            Assistir Aula →
          </a>
        </div>
      `;
    } else {
      // MÓDULO BLOQUEADO RIGOROSAMENTE COM CADEADO
      card.className = 'track-card status-locked';
      card.innerHTML = `
        <div class="track-status-icon lock-icon" aria-label="Módulo Bloqueado com Cadeado">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </div>
        <div class="track-details">
          <div class="track-badge-row">
            <span class="track-step">Módulo ${mod.order}</span>
            <span class="badge-status-locked">Módulo Bloqueado 🔒</span>
          </div>
          <h3 class="track-title" style="color:var(--text-muted);">${escapeHtml(mod.title)}</h3>
          <p class="track-meta">Aguarde a liberação manual pelo Administrador do IBEM conforme seu cronograma pedagógico.</p>
        </div>
        <div class="track-action">
          <button type="button" class="btn btn-secondary btn-sm" disabled title="Aguarde a liberação pelo administrador">
            Acesso Bloqueado 🔒
          </button>
        </div>
      `;
    }

    trackContainer.appendChild(card);
  });
}

// =============================================================================
// 7. SALA DE AULA INTERATIVA (AULA.HTML)
// =============================================================================

function initClassroomPage() {
  const student = state.students.find(s => s.id === state.activeStudentId) || state.students[0];
  const course = ibemCoursesDatabase[student?.courseId || 'prof-info'];

  const courseTitleEl = document.getElementById('classroomCourseTitle');
  if (courseTitleEl && course) {
    courseTitleEl.textContent = course.title;
  }
}

function togglePlaySimulation(element) {
  showToast('Reproduzindo aula em alta definição do IBEM...');
  element.style.transform = 'scale(0.98)';
  setTimeout(() => element.style.transform = 'scale(1)', 150);
}

function completeCurrentLesson() {
  const btn = document.getElementById('btnMarkClassDone');
  if (btn) {
    btn.textContent = 'Aula Concluída ✓';
    btn.style.backgroundColor = 'var(--color-success)';
    btn.style.borderColor = 'var(--color-success)';
  }
  showToast('Aula registrada como concluída!');
}

function prevClassroomStep() {
  showToast('Carregando conteúdo anterior...');
}

function nextClassroomStep() {
  showToast('Carregando próxima aula do módulo...');
}

// Quizzes Interativos
function answerTF(isTrue, btn) {
  const card = document.getElementById('quiz-tf');
  const feedback = document.getElementById('feedback-tf');
  const badge = document.getElementById('badge-tf');
  const buttons = card.querySelectorAll('.tf-options .btn-option');

  buttons.forEach(b => b.classList.remove('selected-correct', 'selected-wrong'));

  if (isTrue === true) {
    btn.classList.add('selected-correct');
    card.className = 'interactive-card answered-correct';
    badge.textContent = 'Correto ✓';
    badge.className = 'status-pill status-active';
    feedback.className = 'feedback-box show correct';
    feedback.innerHTML = '<strong>Correto!</strong> O aprendizado focado e com materiais organizados melhora a retenção do aluno.';
  } else {
    btn.classList.add('selected-wrong');
    card.className = 'interactive-card answered-wrong';
    badge.textContent = 'Incorreto ✕';
    badge.className = 'status-pill';
    feedback.className = 'feedback-box show wrong';
    feedback.innerHTML = '<strong>Atenção:</strong> A organização e a leitura atenta são fundamentais para o aprendizado prático.';
  }
}

function answerMC(optionIndex, btn) {
  const card = document.getElementById('quiz-mc');
  const feedback = document.getElementById('feedback-mc');
  const badge = document.getElementById('badge-mc');
  const buttons = card.querySelectorAll('.mc-options .btn-mc');

  buttons.forEach(b => b.classList.remove('selected-correct', 'selected-wrong'));

  if (optionIndex === 2) {
    btn.classList.add('selected-correct');
    card.className = 'interactive-card answered-correct';
    badge.textContent = 'Correto ✓';
    badge.className = 'status-pill status-active';
    feedback.className = 'feedback-box show correct';
    feedback.innerHTML = '<strong>Exato!</strong> "Pensou em cursos, pense IBEM, faça IBEM" sintetiza o compromisso com a formação profissional.';
  } else {
    btn.classList.add('selected-wrong');
    card.className = 'interactive-card answered-wrong';
    badge.textContent = 'Incorreto ✕';
    feedback.className = 'feedback-box show wrong';
    feedback.innerHTML = '<strong>Tente novamente:</strong> Lembre-se do lema oficial do IBEM.';
  }
}

let matchCompletedCount = 0;
function resolveMatch(buttonElement, targetDescription) {
  if (buttonElement.classList.contains('matched')) return;

  buttonElement.textContent = `✓ ${targetDescription}`;
  buttonElement.classList.add('matched');
  matchCompletedCount++;

  if (matchCompletedCount >= 2) {
    const card = document.getElementById('quiz-match');
    const feedback = document.getElementById('feedback-match');
    const badge = document.getElementById('badge-match');

    card.className = 'interactive-card answered-correct';
    badge.textContent = 'Associado ✓';
    badge.className = 'status-pill status-active';
    feedback.className = 'feedback-box show correct';
    feedback.innerHTML = '<strong>Excelente!</strong> Associação concluída com sucesso.';
  }
}

// =============================================================================
// 8. UTILITÁRIOS GLOBAIS
// =============================================================================
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>ℹ️</span> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function escapeHtml(string) {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return String(string).replace(/[&<>"']/g, s => entityMap[s]);
}

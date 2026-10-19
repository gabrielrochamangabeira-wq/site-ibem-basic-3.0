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
  ACTIVE_STUDENT_ID: 'ibem_simple_active_student_v4',
  LESSONS: 'ibem_simple_lessons_v6'
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

// Banco Inicial de Aulas Oficiais (com foco no YouTube e materiais didáticos)
const initialLessons = [
  // 1. INFORMÁTICA BÁSICA (prof-info)
  {
    id: 'aula_info_1',
    courseId: 'prof-info',
    moduleId: 1,
    title: 'Aula 1: Fundamentos de Informática, Hardware e Windows',
    videoUrl: 'https://www.youtube.com/embed/EW1iP4IQTTg',
    rawVideoUrl: 'https://youtu.be/EW1iP4IQTTg',
    content: `Bem-vindo à primeira aula de Fundamentos de TI do IBEM Cursos e Profissões!

Nesta aula, estudamos a arquitetura essencial de um computador moderno voltado ao ambiente corporativo:
1. Memória RAM e Armazenamento (SSD vs HD): Compreendemos como a velocidade de leitura e gravação afeta a produtividade no trabalho diário.
2. Sistema Operacional Windows: Organização da Área de Trabalho, uso produtivo do Explorador de Arquivos, teclas de atalho essenciais (Win+D, Alt+Tab, Ctrl+Shift+Esc) e boas práticas para evitar perda de dados.
3. Postura e Digitação: Orientações de ergonomia e digitação contínua para alto rendimento no trabalho de escritório.

Exercício Prático Recomendado: Crie uma árvore de pastas no seu computador para simular a gestão de documentos de uma empresa (Clientes, Notas Fiscais e Relatórios).`,
    createdAt: '16/10/2026'
  },
  {
    id: 'aula_info_2',
    courseId: 'prof-info',
    moduleId: 1,
    title: 'Aula 2: Gerenciamento Seguro de Pastas e Navegação na Web',
    videoUrl: 'https://www.youtube.com/embed/EW1iP4IQTTg',
    rawVideoUrl: 'https://youtu.be/EW1iP4IQTTg',
    content: `Nesta segunda aula, aprofundamos a organização técnica de arquivos no Windows:
• Tipos de extensões (.docx, .xlsx, .pdf, .zip) e suas associações com aplicativos.
• Boas práticas para armazenamento seguro em nuvem e uso de pen drives.
• Princípios básicos de segurança da informação contra links suspeitos e malwares.`,
    createdAt: '16/10/2026'
  },
  // 2. TÉCNICO EM DESENVOLVIMENTO DE SISTEMAS (tec-ds)
  {
    id: 'aula_ds_1',
    courseId: 'tec-ds',
    moduleId: 1,
    title: 'Aula 1: Lógica de Programação, Algoritmos e Decisões (IF/ELSE)',
    videoUrl: 'https://www.youtube.com/embed/EW1iP4IQTTg',
    rawVideoUrl: 'https://youtu.be/EW1iP4IQTTg',
    content: `Bem-vindo à aula fundamental de Lógica de Programação do Técnico em Desenvolvimento de Sistemas IBEM!

Tópicos essenciais abordados na aula:
1. Pensamento Computacional e Decomposição: Como estruturar problemas complexos em passos simples e executáveis.
2. Tipos Primitivos de Dados: Inteiros, Reais (Float), Textos (Strings) e Booleanos.
3. Estruturas Condicionais (SE / SENÃO / IF / ELSE): Tomada de decisão em sistemas de controle de acesso e autenticação.
4. Boas práticas de nomenclatura de variáveis e clareza no código-fonte.

Lembre-se: 'Pensou em cursos, pense IBEM, faça IBEM'. Pratique a lógica escrevendo algoritmos diários.`,
    createdAt: '16/10/2026'
  },
  {
    id: 'aula_ds_2',
    courseId: 'tec-ds',
    moduleId: 1,
    title: 'Aula 2: Laços de Repetição (While / For) e Modularização',
    videoUrl: 'https://www.youtube.com/embed/EW1iP4IQTTg',
    rawVideoUrl: 'https://youtu.be/EW1iP4IQTTg',
    content: `Na aula de hoje, aprendemos como automatizar repetições e modularizar código em funções reutilizáveis:
• Laços contados (For) e laços condicionais (While).
• Parâmetros, escopo de variáveis e retorno de funções.
• Resolução prática de exercícios de fixação e depuração de código.`,
    createdAt: '16/10/2026'
  },
  // 3. TÉCNICO EM SEGURANÇA DO TRABALHO (tec-seg)
  {
    id: 'aula_seg_1',
    courseId: 'tec-seg',
    moduleId: 1,
    title: 'Aula 1: Introdução às Normas Regulamentadoras (NRs) e Legislação',
    videoUrl: 'https://www.youtube.com/embed/EW1iP4IQTTg',
    rawVideoUrl: 'https://youtu.be/EW1iP4IQTTg',
    content: `Aula introdutória do Técnico em Segurança do Trabalho IBEM:
1. Histórico e evolução da legislação trabalhista e prevencionista no Brasil.
2. Estrutura geral das Normas Regulamentadoras (NR-1 a NR-38).
3. Responsabilidades legais do empregador, do empregado e a atuação ética do Técnico em Segurança.
4. Identificação preliminar de perigos vs riscos ocupacionais.`,
    createdAt: '16/10/2026'
  },
  // 4. PACOTE ADMINISTRATIVO (prof-adm)
  {
    id: 'aula_adm_1',
    courseId: 'prof-adm',
    moduleId: 1,
    title: 'Aula 1: Rotinas de Assistente Administrativo e Atendimento Corporativo',
    videoUrl: 'https://www.youtube.com/embed/EW1iP4IQTTg',
    rawVideoUrl: 'https://youtu.be/EW1iP4IQTTg',
    content: `Primeira aula do Pacote Administrativo IBEM:
• Atendimento ao cliente presencial, telefônico e via WhatsApp institucional.
• Gestão de agenda executiva, protocolos de recebimento e expedição de documentos.
• Postura profissional, ética corporativa e organização do posto de trabalho.`,
    createdAt: '16/10/2026'
  },
  // 5. TÉCNICO EM ELETROTÉCNICA (tec-eletro)
  {
    id: 'aula_eletro_1',
    courseId: 'tec-eletro',
    moduleId: 1,
    title: 'Aula 1: Grandezas Elétricas Fundamentais e Medições de Tensão',
    videoUrl: 'https://www.youtube.com/embed/EW1iP4IQTTg',
    rawVideoUrl: 'https://youtu.be/EW1iP4IQTTg',
    content: `Aula técnica fundamental do curso de Eletrotécnica IBEM:
• Tensão (Volts), Corrente (Ampères), Resistência (Ohms) e Potência (Watts).
• Primeira e Segunda Leis de Ohm aplicadas a circuitos simples.
• Uso seguro do multímetro digital em bancada de testes e normas de segurança elétrica.`,
    createdAt: '16/10/2026'
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
  activeStudentId: getStoredData(STORAGE_KEYS.ACTIVE_STUDENT_ID, 1),
  lessons: getStoredData(STORAGE_KEYS.LESSONS, initialLessons)
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
  if (document.getElementById('player') || document.getElementById('classroomVideoIframe') || document.getElementById('quiz-tf')) {
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
  renderAdminLessonsList();
}

function setupAdminTabs() {
  const tabs = document.querySelectorAll('.subnav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabKey = tab.getAttribute('data-tab');
      switchToAdminTab(tabKey);
    });
  });
}

function switchToAdminTab(tabKey) {
  const tabs = document.querySelectorAll('.subnav-tab');
  tabs.forEach(t => {
    if (t.getAttribute('data-tab') === tabKey) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
  const targetPane = document.getElementById(`pane-${tabKey}`);
  if (targetPane) targetPane.classList.add('active');
}

function populateCourseSelect() {
  const studentSelect = document.getElementById('formStudentCourse');
  const lessonSelect = document.getElementById('formLessonCourse');
  const adminLessonSelect = document.getElementById('formAdminLessonCourse');

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

  if (adminLessonSelect) {
    adminLessonSelect.innerHTML = '';
    Object.values(ibemCoursesDatabase).forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.title} (${c.type})`;
      adminLessonSelect.appendChild(opt);
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

// =============================================================================
// UTILITÁRIOS E GESTÃO DE AULAS NO LOCALSTORAGE (ADMIN & DINÂMICA)
// =============================================================================

function formatYouTubeEmbedUrl(url) {
  if (!url) return '';
  url = url.trim();

  // Caso o usuário cole a tag inteira <iframe>
  const iframeMatch = url.match(/src=["'](.*?)["']/);
  if (iframeMatch) {
    url = iframeMatch[1];
  }

  // Se já for link de embed
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  // Link curto: https://youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  // Link padrão: https://www.youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  // Link shorts: https://youtube.com/shorts/ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }

  return url;
}

function formatLessonContentToHtml(content) {
  if (!content) return '<p>Nenhum resumo cadastrado para esta aula.</p>';
  
  const paragraphs = content.split(/\n\s*\n/);
  return paragraphs.map(p => {
    let clean = escapeHtml(p.trim());
    clean = clean.replace(/^(?:•|-|\*)\s+(.*)$/gm, '<li>$1</li>');
    if (clean.includes('<li>')) {
      return `<ul class="styled-list">${clean}</ul>`;
    } else {
      return `<p>${clean.replace(/\n/g, '<br>')}</p>`;
    }
  }).join('');
}

// 1. Salvar Aula no LocalStorage pelo Painel do Admin
function saveAdminLesson() {
  const courseSelect = document.getElementById('formAdminLessonCourse');
  const moduleSelect = document.getElementById('formAdminLessonModule');
  const titleInput = document.getElementById('formAdminLessonTitle');
  const videoInput = document.getElementById('formAdminLessonVideo');
  const contentInput = document.getElementById('formAdminLessonContent');

  if (!courseSelect || !titleInput || !videoInput || !contentInput) return;

  const courseId = courseSelect.value;
  const moduleId = parseInt(moduleSelect ? moduleSelect.value : 1, 10) || 1;
  const title = titleInput.value.trim();
  const rawVideo = videoInput.value.trim();
  const content = contentInput.value.trim();

  if (!title) {
    alert('Por favor, informe o título da aula.');
    titleInput.focus();
    return;
  }

  if (!rawVideo) {
    alert('Por favor, informe o link do vídeo do YouTube.');
    videoInput.focus();
    return;
  }

  if (!content) {
    alert('Por favor, preencha o resumo ou material didático da aula.');
    contentInput.focus();
    return;
  }

  const embedUrl = formatYouTubeEmbedUrl(rawVideo);

  const newLesson = {
    id: 'aula_' + Date.now(),
    courseId,
    moduleId,
    title,
    videoUrl: embedUrl,
    rawVideoUrl: rawVideo,
    content,
    createdAt: new Date().toLocaleDateString('pt-BR')
  };

  if (!state.lessons) state.lessons = [];
  state.lessons.unshift(newLesson);
  setStoredData(STORAGE_KEYS.LESSONS, state.lessons);

  // Limpa os campos do formulário
  titleInput.value = '';
  videoInput.value = '';
  contentInput.value = '';

  showToast(`Aula "${title}" cadastrada com sucesso!`);
  renderAdminLessonsList();
}

// Excluir aula do sistema
function deleteAdminLesson(lessonId) {
  const lesson = state.lessons.find(l => l.id === lessonId);
  const title = lesson ? lesson.title : 'esta aula';

  if (confirm(`Deseja realmente excluir a aula "${title}"?`)) {
    state.lessons = state.lessons.filter(l => l.id !== lessonId);
    setStoredData(STORAGE_KEYS.LESSONS, state.lessons);
    showToast('Aula removida do sistema com sucesso.');
    renderAdminLessonsList();
  }
}

// Renderiza a lista de aulas cadastradas na aba do Admin
function renderAdminLessonsList() {
  const tbody = document.getElementById('adminLessonsTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (!state.lessons || state.lessons.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:24px; color:var(--text-muted);">Nenhuma aula cadastrada ainda. Utilize o formulário acima para adicionar aulas.</td></tr>`;
    return;
  }

  state.lessons.forEach(lesson => {
    const course = ibemCoursesDatabase[lesson.courseId] || { title: 'Curso Geral' };
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <span class="course-badge-highlight">${escapeHtml(course.title)}</span>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:3px;">
          Módulo ${lesson.moduleId || 1} • Cadastrada em ${lesson.createdAt || '16/10/2026'}
        </div>
      </td>
      <td>
        <strong style="color:var(--ibem-navy); font-size:0.9rem;">${escapeHtml(lesson.title)}</strong>
      </td>
      <td>
        <a href="${escapeHtml(lesson.rawVideoUrl || lesson.videoUrl)}" target="_blank" rel="noopener noreferrer" style="font-size:0.8rem; color:var(--ibem-blue-primary); text-decoration:none; display:inline-flex; align-items:center; gap:4px;">
          <span>▶ Ver no YouTube</span>
        </a>
      </td>
      <td class="text-right">
        <a href="aula.html?id=${lesson.id}" target="_blank" class="btn btn-secondary btn-sm" title="Abrir sala de aula com este conteúdo">
          Ver como Aluno ↗
        </a>
        <button type="button" class="btn btn-danger-outline btn-sm" onclick="deleteAdminLesson('${lesson.id}')">
          Excluir
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openLessonModal() {
  switchToAdminTab('admin-aulas');
}

function closeLessonModal() {}
function saveLesson() {}

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
      // Lê as aulas salvas no localStorage que pertencem a este curso e módulo
      const moduleLessons = (state.lessons || []).filter(l => l.courseId === course.id && l.moduleId === mod.id);

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

          <!-- LISTA DINÂMICA DE AULAS SALVAS PELO ADMIN -->
          <div class="module-lessons-list">
            ${moduleLessons.length > 0 ? moduleLessons.map((lesson, idx) => `
              <div class="module-lesson-item">
                <div class="lesson-item-left">
                  <span class="lesson-item-badge">Aula ${idx + 1}</span>
                  <span class="lesson-item-title">${escapeHtml(lesson.title)}</span>
                </div>
                <div class="lesson-item-action">
                  <a href="aula.html?id=${lesson.id}" class="btn btn-primary btn-sm" style="text-decoration:none;">
                    Assistir Aula →
                  </a>
                </div>
              </div>
            `).join('') : `
              <div class="module-lesson-item">
                <div class="lesson-item-left">
                  <span class="lesson-item-badge">Aula 1</span>
                  <span class="lesson-item-title">${escapeHtml(mod.title)} (Aula Inicial)</span>
                </div>
                <div class="lesson-item-action">
                  <a href="aula.html?course=${course.id}&module=${mod.id}" class="btn btn-primary btn-sm" style="text-decoration:none;">
                    Assistir Aula →
                  </a>
                </div>
              </div>
            `}
          </div>
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
// 7. SALA DE AULA INTERATIVA DINÂMICA (AULA.HTML) & YOUTUBE PLAYER API
// =============================================================================

let currentClassroomLesson = null;
let currentCourseLessons = [];

// Constante com o ID oficial do vídeo teste enviado pelo professor (https://youtu.be/EW1iP4IQTTg)
const REQUIRED_TEST_VIDEO_ID = 'EW1iP4IQTTg';
const DEFAULT_TEST_VIDEO_ID = REQUIRED_TEST_VIDEO_ID;
let ytPlayer = null;
let currentLoadedVideoId = REQUIRED_TEST_VIDEO_ID;
let isVideoFinished = false;

/**
 * Extrai o ID do vídeo do YouTube a partir de links com múltiplos formatos
 */
function getYouTubeIdFromUrl(url) {
  if (!url) return null;
  url = url.trim();

  // Caso seja colada a tag <iframe> completa
  const iframeMatch = url.match(/src=["'](.*?)["']/);
  if (iframeMatch) url = iframeMatch[1];

  // ID direto de 11 caracteres
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  // youtube.com/embed/ID ou youtube.com/v/ID
  const embedMatch = url.match(/(?:youtube\.com\/(?:embed\/|v\/))([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // youtube.com/shorts/ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  return null;
}

/**
 * Garante que a API do YouTube seja carregada dinamicamente caso não esteja no HTML
 */
function loadYouTubeIframeApiScript() {
  if (window.YT && window.YT.Player) return;
  if (document.getElementById('youtube-iframe-api-script')) return;

  const tag = document.createElement('script');
  tag.id = 'youtube-iframe-api-script';
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(tag, firstScript);
  } else {
    document.head.appendChild(tag);
  }
}

/**
 * Callback global obrigatório da YouTube IFrame Player API
 */
window.onYouTubeIframeAPIReady = function() {
  console.log('[IBEM] YouTube IFrame Player API carregada com sucesso.');
  setupYouTubePlayer(currentLoadedVideoId);
};

/**
 * Inicializa ou atualiza o player do YouTube no container <div id="player"></div>
 */
function setupYouTubePlayer(videoId) {
  const playerContainer = document.getElementById('player');
  if (!playerContainer) return;

  // Garante que o player carregue estritamente o vídeo teste especificado (EW1iP4IQTTg)
  currentLoadedVideoId = videoId || REQUIRED_TEST_VIDEO_ID;

  // Se a API ainda não estiver disponível, registra o callback e injeta o script se necessário
  if (!window.YT || !window.YT.Player) {
    loadYouTubeIframeApiScript();
    return;
  }

  // Se a instância do player já existe, reutiliza carregando o novo vídeo
  if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
    ytPlayer.loadVideoById(currentLoadedVideoId);
    lockLessonCompletion();
    return;
  }

  // Criação da instância oficial do player com os listeners de evento
  try {
    ytPlayer = new YT.Player('player', {
      width: '100%',
      height: '100%',
      videoId: currentLoadedVideoId,
      playerVars: {
        playsinline: 1,
        rel: 0,
        modestbranding: 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  } catch (err) {
    console.error('[IBEM] Falha ao inicializar o player do YouTube:', err);
  }
}

/**
 * Disparado quando o player estiver pronto
 */
function onPlayerReady(event) {
  const statusIndicator = document.getElementById('playerStatusIndicator');
  if (statusIndicator && !isVideoFinished) {
    statusIndicator.textContent = '🔒 Assista ao vídeo teste completo para liberar a conclusão';
  }
}

/**
 * REGRA 3: Monitoramento do estado do vídeo pelo listener onPlayerStateChange
 */
function onPlayerStateChange(event) {
  const statusIndicator = document.getElementById('playerStatusIndicator');
  const playerState = event.data;

  // YT.PlayerState:
  // -1: UNSTARTED, 0: ENDED, 1: PLAYING, 2: PAUSED, 3: BUFFERING, 5: CUED
  if (window.YT && playerState === YT.PlayerState.PLAYING) {
    if (statusIndicator && !isVideoFinished) {
      statusIndicator.textContent = '▶ Reproduzindo gravação da aula... Assista até o fim para liberar a conclusão.';
    }
  } else if (window.YT && playerState === YT.PlayerState.PAUSED) {
    if (statusIndicator && !isVideoFinished) {
      statusIndicator.textContent = '⏸ Vídeo pausado. Continue assistindo para liberar a conclusão.';
    }
  } else if (window.YT && playerState === YT.PlayerState.BUFFERING) {
    if (statusIndicator && !isVideoFinished) {
      statusIndicator.textContent = '⏳ Carregando transmissão...';
    }
  } else if (playerState === 0 || (window.YT && playerState === YT.PlayerState.ENDED)) {
    // REGRA ESTRITA: Garante que a função só dispare quando esse vídeo específico (EW1iP4IQTTg) chegar ao fim
    let endedVideoId = null;
    try {
      if (ytPlayer && typeof ytPlayer.getVideoData === 'function') {
        const videoData = ytPlayer.getVideoData();
        endedVideoId = videoData ? videoData.video_id : null;
      }
    } catch (e) {
      console.warn('[IBEM] Erro ao obter video_id:', e);
    }

    if (!endedVideoId) {
      endedVideoId = currentLoadedVideoId;
    }

    // Validação estrita: somente libera se o vídeo finalizado for exatamente o vídeo teste especificado
    if (endedVideoId === REQUIRED_TEST_VIDEO_ID) {
      handleVideoEnded(endedVideoId);
    } else {
      console.warn(`[IBEM Bloqueio] Vídeo finalizado (${endedVideoId}) não é o vídeo teste exigido (${REQUIRED_TEST_VIDEO_ID}). Conclusão bloqueada.`);
      showToast('Atenção: A conclusão só é liberada ao assistir ao vídeo teste oficial completo.');
    }
  }
}

/**
 * REGRA 2: Bloqueia o botão de conclusão no início (visualmente cinza e inativo)
 */
function lockLessonCompletion() {
  isVideoFinished = false;

  // Botão superior da navbar
  const btnDone = document.getElementById('btnMarkClassDone');
  if (btnDone) {
    btnDone.disabled = true;
    btnDone.setAttribute('disabled', 'disabled');
    btnDone.classList.add('is-disabled');
    btnDone.classList.remove('is-unlocked');
    btnDone.title = 'Assista à explicação até o fim para liberar a conclusão da aula';
    const icon = document.getElementById('btnLockIcon');
    if (icon) icon.textContent = '🔒';
    const text = document.getElementById('btnCompleteText');
    if (text) text.textContent = 'Concluir Aula e Voltar ao Painel';
  }

  // Botão inferior do card de conclusão
  const btnFooter = document.getElementById('btnMarkClassDoneFooter');
  if (btnFooter) {
    btnFooter.disabled = true;
    btnFooter.setAttribute('disabled', 'disabled');
    btnFooter.classList.add('is-disabled');
    btnFooter.classList.remove('is-unlocked');
    btnFooter.title = 'Assista à explicação até o fim para liberar a conclusão da aula';
    const footerIcon = document.getElementById('btnFooterLockIcon');
    if (footerIcon) footerIcon.textContent = '🔒';
  }

  // Oculta banner de conclusão na tela
  const alertBanner = document.getElementById('lessonCompletionAlert');
  if (alertBanner) {
    alertBanner.style.display = 'none';
  }

  const statusIndicator = document.getElementById('playerStatusIndicator');
  if (statusIndicator) {
    statusIndicator.textContent = '🔒 Assista ao vídeo teste até o final para liberar a conclusão';
  }
}

/**
 * REGRA 4: Liberação automática ao finalizar a explicação específica
 */
function handleVideoEnded(videoId) {
  // Verificação estrita: assegura que o vídeo seja exatamente o vídeo teste específico
  const currentId = videoId || (ytPlayer && typeof ytPlayer.getVideoData === 'function' && ytPlayer.getVideoData() ? ytPlayer.getVideoData().video_id : currentLoadedVideoId);
  if (currentId && currentId !== REQUIRED_TEST_VIDEO_ID) {
    console.warn(`[IBEM Bloqueio] Tentativa de conclusão com vídeo incorreto: ${currentId}`);
    return;
  }

  if (isVideoFinished) return; // Evita múltiplas ativações
  isVideoFinished = true;

  // 1. Habilita o botão superior
  const btnDone = document.getElementById('btnMarkClassDone');
  if (btnDone) {
    btnDone.disabled = false;
    btnDone.removeAttribute('disabled');
    btnDone.classList.remove('is-disabled');
    btnDone.classList.add('is-unlocked');
    btnDone.title = 'Explicação concluída! Clique para registrar a conclusão e voltar ao painel';
    const icon = document.getElementById('btnLockIcon');
    if (icon) icon.textContent = '✓';
    const text = document.getElementById('btnCompleteText');
    if (text) text.textContent = 'Concluir Aula e Voltar ao Painel ✓';
  }

  // 2. Habilita o botão inferior
  const btnFooter = document.getElementById('btnMarkClassDoneFooter');
  if (btnFooter) {
    btnFooter.disabled = false;
    btnFooter.removeAttribute('disabled');
    btnFooter.classList.remove('is-disabled');
    btnFooter.classList.add('is-unlocked');
    btnFooter.title = 'Explicação concluída! Clique para registrar a conclusão e voltar ao painel';
    const footerIcon = document.getElementById('btnFooterLockIcon');
    if (footerIcon) footerIcon.textContent = '✓';
  }

  // 3. Atualiza indicador da barra de controles do player
  const statusIndicator = document.getElementById('playerStatusIndicator');
  if (statusIndicator) {
    statusIndicator.textContent = '✅ Explicação concluída! Aula liberada para finalização.';
  }

  // 4. Exibe o pequeno alerta na tela
  const message = 'Explicação concluída! Você já pode marcar esta aula como finalizada.';
  showCompletionAlert(message);
}

/**
 * Exibe o alerta visual na tela e também no sistema de toast
 */
function showCompletionAlert(message) {
  // Notificação toast na tela
  showToast(message);

  // Alerta em destaque no corpo da página
  const alertBanner = document.getElementById('lessonCompletionAlert');
  if (alertBanner) {
    alertBanner.style.display = 'flex';
    const msgElement = alertBanner.querySelector('.lesson-alert-msg');
    if (msgElement) {
      msgElement.textContent = message;
    }
  }
}

/**
 * Função utilitária para testes rápidos (simula término do vídeo específico via JS)
 */
window.simulateVideoEnded = function() {
  console.log(`[IBEM Teste] Simulando estado ENDED do vídeo específico: ${REQUIRED_TEST_VIDEO_ID}`);
  handleVideoEnded(REQUIRED_TEST_VIDEO_ID);
};

/**
 * Ação ao clicar no botão "Concluir Aula e Voltar ao Painel"
 */
function completeCurrentLesson() {
  const btnDone = document.getElementById('btnMarkClassDone');
  if (btnDone && btnDone.disabled) {
    showToast('Atenção: Assista à explicação completa até o final antes de concluir a aula.');
    return;
  }

  // Salva a conclusão no histórico do aluno no localStorage
  if (currentClassroomLesson) {
    try {
      const studentId = state.activeStudentId || 1;
      const key = `ibem_completed_lessons_${studentId}`;
      const list = JSON.parse(localStorage.getItem(key) || '[]');
      if (!list.includes(currentClassroomLesson.id)) {
        list.push(currentClassroomLesson.id);
        localStorage.setItem(key, JSON.stringify(list));
      }
    } catch (e) {
      console.warn('Erro ao salvar progresso:', e);
    }
  }

  showToast('Aula concluída com sucesso! Retornando ao Painel do Aluno...');

  setTimeout(() => {
    window.location.href = 'aluno.html';
  }, 900);
}

function initClassroomPage() {
  // Garante o bloqueio imediato do botão
  lockLessonCompletion();

  const urlParams = new URLSearchParams(window.location.search);
  const lessonId = urlParams.get('id');
  const courseParam = urlParams.get('course');
  const moduleParam = urlParams.get('module') ? parseInt(urlParams.get('module'), 10) : 1;

  let activeStudent = state.students.find(s => s.id === state.activeStudentId) || state.students[0];
  const targetCourseId = courseParam || activeStudent?.courseId || 'prof-info';

  // Todas as aulas cadastradas deste curso
  currentCourseLessons = (state.lessons || []).filter(l => l.courseId === targetCourseId);

  // 1. Tenta carregar por ID direto da URL
  if (lessonId) {
    currentClassroomLesson = (state.lessons || []).find(l => l.id === lessonId);
  }

  // 2. Se não achou por ID, tenta por módulo do curso
  if (!currentClassroomLesson && currentCourseLessons.length > 0) {
    currentClassroomLesson = currentCourseLessons.find(l => l.moduleId === moduleParam) || currentCourseLessons[0];
  }

  // 3. Fallback geral
  if (!currentClassroomLesson && state.lessons && state.lessons.length > 0) {
    currentClassroomLesson = state.lessons[0];
  }

  if (currentClassroomLesson) {
    renderClassroomContent(currentClassroomLesson);
  } else {
    // Caso padrão para testes com o vídeo de teste configurado
    setupYouTubePlayer(DEFAULT_TEST_VIDEO_ID);
  }
}

function renderClassroomContent(lesson) {
  const course = ibemCoursesDatabase[lesson.courseId] || { title: 'Curso IBEM' };

  // Garante que o botão inicie rigorosamente desabilitado (Requisito 2)
  lockLessonCompletion();

  // Título no Navegador e na Navbar Superior
  document.title = `${lesson.title} — IBEM Cursos e Profissões`;

  const titleCrumbs = document.getElementById('classroomTitle');
  if (titleCrumbs) titleCrumbs.textContent = lesson.title;

  const moduleCrumbs = document.getElementById('classroomModuleBreadcrumb');
  if (moduleCrumbs) moduleCrumbs.textContent = `Módulo ${lesson.moduleId || 1}: ${course.title}`;

  // Título e Metadados do Artigo Didático
  const articleTitle = document.getElementById('articleTitle');
  if (articleTitle) articleTitle.textContent = lesson.title;

  const courseTag = document.getElementById('lessonCourseTag');
  if (courseTag) courseTag.textContent = `Curso: ${course.title}`;

  const moduleTag = document.getElementById('lessonModuleTag');
  if (moduleTag) moduleTag.textContent = `Módulo ${lesson.moduleId || 1}`;

  // Player de Vídeo Dinâmico com YouTube IFrame Player API
  // Carrega estritamente o vídeo teste enviado pelo professor (EW1iP4IQTTg)
  const videoId = REQUIRED_TEST_VIDEO_ID;
  setupYouTubePlayer(videoId);

  // Resumo Didático e Conteúdo Cadastrado pelo Administrador
  const articleBody = document.getElementById('articleBody');
  if (articleBody) {
    articleBody.innerHTML = formatLessonContentToHtml(lesson.content);
  }

  // Configuração dos Botões Anterior e Próxima
  setupAdjacentLessonNavigation(lesson);
}

function setupAdjacentLessonNavigation(lesson) {
  const btnPrev = document.getElementById('btnPrevLesson');
  const btnNext = document.getElementById('btnNextLesson');

  if (!currentCourseLessons || currentCourseLessons.length <= 1) {
    if (btnPrev) btnPrev.style.display = 'none';
    if (btnNext) btnNext.style.display = 'none';
    return;
  }

  const currentIndex = currentCourseLessons.findIndex(l => l.id === lesson.id);

  if (btnPrev) {
    btnPrev.style.display = 'inline-flex';
    btnPrev.disabled = currentIndex <= 0;
    btnPrev.style.opacity = currentIndex <= 0 ? '0.45' : '1';
    btnPrev.style.cursor = currentIndex <= 0 ? 'not-allowed' : 'pointer';
  }

  if (btnNext) {
    btnNext.style.display = 'inline-flex';
    btnNext.disabled = currentIndex >= currentCourseLessons.length - 1;
    btnNext.style.opacity = currentIndex >= currentCourseLessons.length - 1 ? '0.45' : '1';
    btnNext.style.cursor = currentIndex >= currentCourseLessons.length - 1 ? 'not-allowed' : 'pointer';
  }
}

function goToAdjacentLesson(offset) {
  if (!currentClassroomLesson || !currentCourseLessons || currentCourseLessons.length === 0) return;

  const currentIndex = currentCourseLessons.findIndex(l => l.id === currentClassroomLesson.id);
  const targetIndex = currentIndex + offset;

  if (targetIndex >= 0 && targetIndex < currentCourseLessons.length) {
    const targetLesson = currentCourseLessons[targetIndex];
    window.location.href = `aula.html?id=${targetLesson.id}`;
  }
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

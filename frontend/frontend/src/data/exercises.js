// Banco de dados completo de exercícios com GIFs reais
export const exercisesDatabase = [
  // PEITO
  {
    id: 1,
    name: 'Supino Reto',
    category: 'Peito',
    difficulty: 'Intermediário',
    equipment: 'Barra',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif',
    muscles: ['Peitoral Maior', 'Tríceps', 'Deltoides Anterior'],
    instructions: [
      'Deite-se no banco reto com os pés apoiados no chão',
      'Segure a barra com pegada um pouco mais larga que os ombros',
      'Desça a barra até o meio do peito controladamente',
      'Empurre a barra para cima até estender os braços',
      'Mantenha os cotovelos em 45° do corpo'
    ],
    tips: 'Mantenha as escápulas retraídas durante todo o movimento'
  },
  {
    id: 2,
    name: 'Supino Inclinado',
    category: 'Peito',
    difficulty: 'Intermediário',
    equipment: 'Barra',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif',
    muscles: ['Peitoral Superior', 'Deltoides Anterior', 'Tríceps'],
    instructions: [
      'Ajuste o banco para 30-45 graus de inclinação',
      'Deite-se e segure a barra acima do peito superior',
      'Desça controladamente até próximo ao peito',
      'Empurre para cima explosivamente',
      'Não arqueie as costas excessivamente'
    ],
    tips: 'Inclinação ideal: 30-45 graus para focar no peitoral superior'
  },
  {
    id: 3,
    name: 'Crucifixo Reto',
    category: 'Peito',
    difficulty: 'Iniciante',
    equipment: 'Halteres',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif',
    muscles: ['Peitoral Maior', 'Deltoides Anterior'],
    instructions: [
      'Deite-se no banco reto segurando halteres acima do peito',
      'Com cotovelos levemente flexionados, abra os braços',
      'Desça até sentir alongamento no peito',
      'Contraia o peito para retornar à posição inicial',
      'Mantenha os cotovelos sempre levemente flexionados'
    ],
    tips: 'Movimento de abraço, não flexione os cotovelos durante a execução'
  },
  {
    id: 4,
    name: 'Flexão de Braço',
    category: 'Peito',
    difficulty: 'Iniciante',
    equipment: 'Peso Corporal',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif',
    muscles: ['Peitoral Maior', 'Tríceps', 'Core', 'Deltoides'],
    instructions: [
      'Posição de prancha com mãos alinhadas aos ombros',
      'Mantenha o corpo reto da cabeça aos pés',
      'Desça o corpo flexionando os cotovelos',
      'Empurre para cima até estender os braços',
      'Core sempre contraído'
    ],
    tips: 'Variações: mãos mais juntas (tríceps), mais afastadas (peito)'
  },

  // COSTAS
  {
    id: 5,
    name: 'Barra Fixa',
    category: 'Costas',
    difficulty: 'Avançado',
    equipment: 'Barra Fixa',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif',
    muscles: ['Dorsal', 'Bíceps', 'Romboides', 'Core'],
    instructions: [
      'Pegue a barra com pegada pronada (palmas para frente)',
      'Largura um pouco maior que os ombros',
      'Puxe o corpo para cima até o queixo passar a barra',
      'Desça controladamente até extensão completa',
      'Evite balançar o corpo'
    ],
    tips: 'Inicie com pegada supinada se for mais fácil'
  },
  {
    id: 6,
    name: 'Remada Curvada',
    category: 'Costas',
    difficulty: 'Intermediário',
    equipment: 'Barra',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif',
    muscles: ['Dorsal', 'Romboides', 'Trapézio', 'Bíceps'],
    instructions: [
      'Pegue a barra com pegada pronada',
      'Incline o tronco a 45 graus mantendo costas retas',
      'Puxe a barra em direção ao abdômen',
      'Contraia as escápulas no topo do movimento',
      'Desça controladamente'
    ],
    tips: 'Mantenha joelhos levemente flexionados para estabilidade'
  },
  {
    id: 7,
    name: 'Pulldown',
    category: 'Costas',
    difficulty: 'Iniciante',
    equipment: 'Máquina',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif',
    muscles: ['Dorsal', 'Bíceps', 'Romboides'],
    instructions: [
      'Sente-se na máquina e ajuste as almofadas das pernas',
      'Pegue a barra com pegada larga',
      'Puxe a barra até a altura do peito',
      'Contraia as costas no final do movimento',
      'Retorne controladamente'
    ],
    tips: 'Não puxe atrás da nuca, sempre à frente'
  },
  {
    id: 8,
    name: 'Remada Unilateral',
    category: 'Costas',
    difficulty: 'Iniciante',
    equipment: 'Halteres',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif',
    muscles: ['Dorsal', 'Romboides', 'Trapézio'],
    instructions: [
      'Apoie um joelho e mão no banco',
      'Segure o halter com a outra mão',
      'Puxe o halter em direção ao quadril',
      'Contraia a escápula no topo',
      'Desça controladamente'
    ],
    tips: 'Mantenha o tronco paralelo ao chão'
  },

  // PERNAS
  {
    id: 9,
    name: 'Agachamento Livre',
    category: 'Pernas',
    difficulty: 'Avançado',
    equipment: 'Barra',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Squat.gif',
    muscles: ['Quadríceps', 'Glúteos', 'Posteriores', 'Core'],
    instructions: [
      'Posicione a barra nos ombros (trapézio)',
      'Pés na largura dos ombros',
      'Desça flexionando quadril e joelhos',
      'Vá até coxa paralela ao chão ou abaixo',
      'Empurre pelos calcanhares para subir'
    ],
    tips: 'Joelhos na direção dos pés, peito sempre para cima'
  },
  {
    id: 10,
    name: 'Leg Press 45°',
    category: 'Pernas',
    difficulty: 'Iniciante',
    equipment: 'Máquina',
    gifUrl: 'https://v2.exercisedb.io/image/c-WpLPnWXUr5Xf',
    muscles: ['Quadríceps', 'Glúteos', 'Posteriores'],
    instructions: [
      'Sente-se na máquina com costas apoiadas',
      'Pés na plataforma, largura dos ombros',
      'Destrave a máquina e desça controladamente',
      'Flexione até 90 graus nos joelhos',
      'Empurre para estender as pernas'
    ],
    tips: 'Não estenda completamente os joelhos no topo'
  },
  {
    id: 11,
    name: 'Cadeira Extensora',
    category: 'Pernas',
    difficulty: 'Iniciante',
    equipment: 'Máquina',
    gifUrl: 'https://v2.exercisedb.io/image/OwJjkACMZnpDtZ',
    muscles: ['Quadríceps'],
    instructions: [
      'Sente-se e ajuste o encosto',
      'Posicione as pernas atrás das almofadas',
      'Estenda as pernas até ficarem retas',
      'Contraia o quadríceps no topo',
      'Desça controladamente'
    ],
    tips: 'Exercício de isolamento, use carga moderada'
  },
  {
    id: 12,
    name: 'Mesa Flexora',
    category: 'Pernas',
    difficulty: 'Iniciante',
    equipment: 'Máquina',
    gifUrl: 'https://v2.exercisedb.io/image/1Pjp1p5-9hDnZW',
    muscles: ['Posteriores de Coxa', 'Panturrilhas'],
    instructions: [
      'Deite-se de bruços na máquina',
      'Posicione os calcanhares sob as almofadas',
      'Flexione as pernas em direção aos glúteos',
      'Contraia os posteriores no topo',
      'Desça controladamente'
    ],
    tips: 'Mantenha o quadril fixo no banco'
  },
  {
    id: 13,
    name: 'Stiff',
    category: 'Pernas',
    difficulty: 'Intermediário',
    equipment: 'Barra',
    gifUrl: 'https://v2.exercisedb.io/image/3Y9NTPBx9QslZF',
    muscles: ['Posteriores de Coxa', 'Glúteos', 'Lombar'],
    instructions: [
      'Segure a barra com pegada pronada',
      'Mantenha pernas levemente flexionadas',
      'Incline o tronco para frente com costas retas',
      'Desça até sentir alongamento nos posteriores',
      'Volte contraindo glúteos e posteriores'
    ],
    tips: 'Movimento do quadril, não das costas'
  },
  {
    id: 14,
    name: 'Panturrilha em Pé',
    category: 'Pernas',
    difficulty: 'Iniciante',
    equipment: 'Máquina',
    gifUrl: 'https://v2.exercisedb.io/image/0xqCLgNSq4EYFN',
    muscles: ['Panturrilhas (Gastrocnêmio)'],
    instructions: [
      'Posicione os ombros sob as almofadas',
      'Dedos dos pés na plataforma',
      'Suba na ponta dos pés o máximo possível',
      'Contraia as panturrilhas no topo',
      'Desça alongando completamente'
    ],
    tips: 'Amplitude completa é essencial'
  },

  // OMBROS
  {
    id: 15,
    name: 'Desenvolvimento com Barra',
    category: 'Ombros',
    difficulty: 'Intermediário',
    equipment: 'Barra',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif',
    muscles: ['Deltoides', 'Tríceps', 'Trapézio'],
    instructions: [
      'Sente-se ou fique em pé com a barra na altura do peito',
      'Pegada um pouco mais larga que os ombros',
      'Empurre a barra para cima até estender os braços',
      'Desça controladamente até a altura do queixo',
      'Não arqueie as costas'
    ],
    tips: 'Pode ser feito sentado para mais estabilidade'
  },
  {
    id: 16,
    name: 'Elevação Lateral',
    category: 'Ombros',
    difficulty: 'Iniciante',
    equipment: 'Halteres',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif',
    muscles: ['Deltoides Medial'],
    instructions: [
      'Segure halteres ao lado do corpo',
      'Cotovelos levemente flexionados',
      'Eleve os braços lateralmente até a altura dos ombros',
      'Pause no topo',
      'Desça controladamente'
    ],
    tips: 'Não use impulso, movimento controlado'
  },
  {
    id: 17,
    name: 'Elevação Frontal',
    category: 'Ombros',
    difficulty: 'Iniciante',
    equipment: 'Halteres',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Front-Raise.gif',
    muscles: ['Deltoides Anterior'],
    instructions: [
      'Segure halteres na frente das coxas',
      'Braços estendidos com leve flexão nos cotovelos',
      'Eleve os braços à frente até altura dos ombros',
      'Pause no topo',
      'Desça controladamente'
    ],
    tips: 'Pode alternar os braços ou fazer simultâneo'
  },
  {
    id: 18,
    name: 'Crucifixo Inverso',
    category: 'Ombros',
    difficulty: 'Intermediário',
    equipment: 'Halteres',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Reverse-Fly.gif',
    muscles: ['Deltoides Posterior', 'Romboides'],
    instructions: [
      'Incline o tronco para frente (45-90 graus)',
      'Segure halteres com braços pendentes',
      'Abra os braços lateralmente',
      'Contraia as escápulas',
      'Retorne controladamente'
    ],
    tips: 'Foco no deltoides posterior, essencial para ombros equilibrados'
  },

  // BRAÇOS
  {
    id: 19,
    name: 'Rosca Direta',
    category: 'Braços',
    difficulty: 'Iniciante',
    equipment: 'Barra',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif',
    muscles: ['Bíceps Braquial'],
    instructions: [
      'Segure a barra com pegada supinada',
      'Cotovelos fixos ao lado do corpo',
      'Flexione os braços levando a barra ao peito',
      'Contraia o bíceps no topo',
      'Desça controladamente'
    ],
    tips: 'Não balance o corpo, movimento apenas dos cotovelos'
  },
  {
    id: 20,
    name: 'Rosca Alternada',
    category: 'Braços',
    difficulty: 'Iniciante',
    equipment: 'Halteres',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',
    muscles: ['Bíceps Braquial', 'Braquial'],
    instructions: [
      'Segure halteres ao lado do corpo',
      'Alterne a flexão de cada braço',
      'Gire o pulso durante a subida (supinação)',
      'Contraia no topo',
      'Desça controladamente'
    ],
    tips: 'Movimento de supinação trabalha melhor o bíceps'
  },
  {
    id: 21,
    name: 'Rosca Martelo',
    category: 'Braços',
    difficulty: 'Iniciante',
    equipment: 'Halteres',
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif',
    muscles: ['Braquial', 'Bíceps', 'Antebraço'],
    instructions: [
      'Segure halteres com pegada neutra (palmas face a face)',
      'Cotovelos fixos ao lado do corpo',
      'Flexione os braços mantendo pegada neutra',
      'Contraia no topo',
      'Desça controladamente'
    ],
    tips: 'Ótimo para desenvolver a espessura dos braços'
  },
  {
    id: 22,
    name: 'Tríceps Testa',
    category: 'Braços',
    difficulty: 'Intermediário',
    equipment: 'Barra',
    gifUrl: 'https://v2.exercisedb.io/image/6FW2-t00z1Ibnf',
    muscles: ['Tríceps (3 cabeças)'],
    instructions: [
      'Deite-se no banco segurando a barra',
      'Braços estendidos acima da cabeça',
      'Flexione apenas os cotovelos, descendo a barra à testa',
      'Mantenha cotovelos fixos',
      'Estenda os braços contraindo o tríceps'
    ],
    tips: 'Também chamado de "skull crusher"'
  },
  {
    id: 23,
    name: 'Tríceps Pulley',
    category: 'Braços',
    difficulty: 'Iniciante',
    equipment: 'Cabo',
    gifUrl: 'https://v2.exercisedb.io/image/ZUYxyEQjGmgJxl',
    muscles: ['Tríceps (cabeça lateral)'],
    instructions: [
      'Segure a barra ou corda no pulley alto',
      'Cotovelos fixos ao lado do corpo',
      'Empurre para baixo até extensão completa',
      'Contraia o tríceps no final',
      'Retorne controladamente'
    ],
    tips: 'Não abra os cotovelos durante o movimento'
  },
  {
    id: 24,
    name: 'Tríceps Francês',
    category: 'Braços',
    difficulty: 'Intermediário',
    equipment: 'Halteres',
    gifUrl: 'https://v2.exercisedb.io/image/3dLAOTkXVR3qHy',
    muscles: ['Tríceps (cabeça longa)'],
    instructions: [
      'Segure um halter com ambas as mãos acima da cabeça',
      'Flexione apenas os cotovelos, descendo o halter atrás da cabeça',
      'Mantenha cotovelos apontando para cima',
      'Estenda os braços completamente',
      'Contraia o tríceps no topo'
    ],
    tips: 'Excelente para a cabeça longa do tríceps'
  },

  // ABDÔMEN
  {
    id: 25,
    name: 'Abdominal Supra',
    category: 'Abdômen',
    difficulty: 'Iniciante',
    equipment: 'Peso Corporal',
    gifUrl: 'https://v2.exercisedb.io/image/foPwgc5-P2Nxv5',
    muscles: ['Reto Abdominal (superior)'],
    instructions: [
      'Deite-se com joelhos flexionados',
      'Mãos atrás da cabeça ou cruzadas no peito',
      'Eleve o tronco em direção aos joelhos',
      'Contraia o abdômen',
      'Desça controladamente'
    ],
    tips: 'Não puxe o pescoço, força vem do abdômen'
  },
  {
    id: 26,
    name: 'Elevação de Pernas',
    category: 'Abdômen',
    difficulty: 'Intermediário',
    equipment: 'Peso Corporal',
    gifUrl: 'https://v2.exercisedb.io/image/i5PrZxL-wWQhvD',
    muscles: ['Reto Abdominal (inferior)'],
    instructions: [
      'Deite-se com as pernas estendidas',
      'Mãos ao lado do corpo ou sob o glúteo',
      'Eleve as pernas até 90 graus',
      'Desça sem tocar o chão',
      'Mantenha lombar no chão'
    ],
    tips: 'Pode flexionar levemente os joelhos se necessário'
  },
  {
    id: 27,
    name: 'Prancha',
    category: 'Abdômen',
    difficulty: 'Iniciante',
    equipment: 'Peso Corporal',
    gifUrl: 'https://v2.exercisedb.io/image/6eV09JKcPYhZUO',
    muscles: ['Core Completo', 'Reto Abdominal', 'Transverso'],
    instructions: [
      'Apoie-se nos antebraços e dedos dos pés',
      'Corpo em linha reta da cabeça aos pés',
      'Contraia abdômen e glúteos',
      'Mantenha a posição sem arquear as costas',
      'Respire normalmente'
    ],
    tips: 'Comece com 20-30s e aumente gradualmente'
  },
  {
    id: 28,
    name: 'Abdominal Bicicleta',
    category: 'Abdômen',
    difficulty: 'Intermediário',
    equipment: 'Peso Corporal',
    gifUrl: 'https://v2.exercisedb.io/image/bQlyCT2lZzWwVA',
    muscles: ['Oblíquos', 'Reto Abdominal'],
    instructions: [
      'Deite-se com mãos atrás da cabeça',
      'Eleve pernas e ombros do chão',
      'Leve cotovelo direito ao joelho esquerdo',
      'Alterne os lados em movimento de pedalar',
      'Mantenha ritmo constante'
    ],
    tips: 'Excelente para oblíquos e definição'
  },
  {
    id: 29,
    name: 'Prancha Lateral',
    category: 'Abdômen',
    difficulty: 'Intermediário',
    equipment: 'Peso Corporal',
    gifUrl: 'https://v2.exercisedb.io/image/b7nDSFfHlmJdHC',
    muscles: ['Oblíquos', 'Core Lateral'],
    instructions: [
      'Deite-se de lado apoiado no antebraço',
      'Empilhe os pés um sobre o outro',
      'Eleve o quadril formando linha reta',
      'Mantenha a posição',
      'Troque de lado'
    ],
    tips: 'Essencial para estabilidade e core lateral'
  },
  {
    id: 30,
    name: 'Russian Twist',
    category: 'Abdômen',
    difficulty: 'Intermediário',
    equipment: 'Peso Corporal',
    gifUrl: 'https://v2.exercisedb.io/image/O4C0AXNYaO29g1',
    muscles: ['Oblíquos', 'Reto Abdominal'],
    instructions: [
      'Sente-se com joelhos flexionados e pés elevados',
      'Incline o tronco para trás',
      'Gire o tronco alternando os lados',
      'Pode segurar peso para aumentar intensidade',
      'Mantenha o core sempre contraído'
    ],
    tips: 'Movimento controlado, não use impulso'
  }
];

// Categorias disponíveis
export const categories = [
  'Todos',
  'Peito',
  'Costas',
  'Pernas',
  'Ombros',
  'Braços',
  'Abdômen'
];

// Níveis de dificuldade
export const difficulties = [
  'Todos',
  'Iniciante',
  'Intermediário',
  'Avançado'
];

// Equipamentos
export const equipments = [
  'Todos',
  'Peso Corporal',
  'Halteres',
  'Barra',
  'Máquina',
  'Cabo',
  'Barra Fixa'
];

import { ChapterStage, type Chapter } from './chapter-stage'

/**
 * Os quatro capítulos da experiência Gold Tour.
 *
 * A ordem é narrativa, não arbitrária: começa na cidade histórica, abre para
 * a baía, sobe para a cidade em dois níveis e termina no veículo — que é
 * exatamente o que vem depois na página (a seção de frota). O capítulo 04
 * existe para dar continuidade entre a jornada e a conversão.
 *
 * O Farol da Barra não entra aqui: ele é o hero. Repeti-lo tiraria a
 * sensação de progressão.
 *
 * Nenhum capítulo promete roteiro fechado, duração ou parada específica —
 * essa restrição vem da Etapa 09 (Prompt 09 proíbe sequência fechada sem
 * confirmação da operação) e continua valendo aqui.
 */
const CHAPTERS: Chapter[] = [
  {
    id: 'capitulo-historico',
    eyebrow: 'Salvador histórico',
    title: 'A cidade antiga, no horário em que ela se deixa ver.',
    body: 'Ladeiras, igrejas e casarões do centro. A equipe conhece a hora em que a luz favorece e o movimento ainda deixa andar — e monta o trajeto a partir disso.',
    video: '/media/salvador-historico.mp4',
    poster: '/media/salvador-historico-poster.jpg',
    alt: 'Rua do centro histórico de Salvador com casarões coloridos',
    focus: '55% 50%',
    cta: { label: 'Conhecer os passeios', href: '/passeios' },
  },
  {
    id: 'capitulo-baia',
    eyebrow: 'Baía e cidade baixa',
    title: 'De onde Salvador finalmente faz sentido.',
    body: 'A Baía de Todos-os-Santos aberta, o porto e a linha que separa a cidade alta da baixa. É o trecho que explica a geografia da cidade para quem chegou agora.',
    video: '/media/baia-de-todos-os-santos.mp4',
    poster: '/media/baia-de-todos-os-santos-poster.jpg',
    alt: 'Vista da Baía de Todos-os-Santos com navios ao fundo',
    focus: '50% 45%',
    cta: { label: 'Conhecer os passeios', href: '/passeios' },
  },
  {
    id: 'capitulo-elevador',
    eyebrow: 'Dois níveis',
    title: 'Entre a cidade alta e a cidade baixa.',
    body: 'O Elevador Lacerda liga dois Salvadores em menos de um minuto. Percursos que passam por aqui ganham tempo — e uma vista que não se repete.',
    video: '/media/elevador-lacerda.mp4',
    poster: '/media/elevador-lacerda-poster.jpg',
    alt: 'Elevador Lacerda visto a partir da baía',
    focus: '50% 50%',
    cta: { label: 'Conhecer os passeios', href: '/passeios' },
  },
  {
    id: 'capitulo-frota',
    eyebrow: 'O veículo',
    title: 'E o carro que leva você por tudo isso.',
    body: 'Do traslado individual à coordenação de um grupo inteiro: a escolha do veículo vem depois do trajeto, não antes. A equipe ajuda a decidir na solicitação.',
    video: '/media/sprinter.mp4',
    poster: '/media/sprinter-poster.jpg',
    alt: 'Van executiva preta da frota',
    focus: '50% 55%',
    cta: { label: 'Ver a frota', href: '/frota' },
  },
]

export function SalvadorChapters() {
  return (
    <ChapterStage
      chapters={CHAPTERS}
      heading="Salvador do seu jeito"
      skipTargetId="frota"
    />
  )
}

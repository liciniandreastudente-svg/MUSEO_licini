import { ref } from 'vue'
import { cercaOpere } from '@/services/europeana'

export function usaHomeView() {
  const testoRicerca = ref('')
  const ultimaRicerca = ref('')
  const listaOpere = ref([])
  const ricercaInCorso = ref(false)
  const numeroPagina = ref(1)
  const schedaAperta = ref(false)
  const operaAttiva = ref(null)

  const listaSuggerimenti = ['Monet', 'Leonardo Da Vinci', 'Rinascimento', 'Impressionismo', 'Ritratto', 'Paesaggio']

  async function avviaRicerca(pagina = 1) {
    if (!testoRicerca.value.trim()) return
    ricercaInCorso.value = true
    numeroPagina.value = pagina
    ultimaRicerca.value = testoRicerca.value
    listaOpere.value = await cercaOpere(testoRicerca.value, pagina)
    ricercaInCorso.value = false
    if (pagina > 1) window.scrollTo({ top: 600, behavior: 'smooth' })
  }

  function selezionaSuggerimento(suggerimento) {
    testoRicerca.value = suggerimento
    avviaRicerca(1)
  }

  function apriScheda(opera) {
    operaAttiva.value = opera
    schedaAperta.value = true
  }

  return {
    testoRicerca, ultimaRicerca, listaOpere,
    ricercaInCorso, numeroPagina, schedaAperta,
    operaAttiva, listaSuggerimenti,
    avviaRicerca, selezionaSuggerimento, apriScheda
  }
}
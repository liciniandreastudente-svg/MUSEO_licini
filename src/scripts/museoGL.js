import { ref, watch } from 'vue'
import { chiediAGemini } from '@/services/gemini'

export function usaMuseoGL(props, emit) {
  const dialogAperto = ref(props.modelValue)
  const testoAnalisi = ref('')
  const analisiInCorso = ref(false)

  watch(() => props.modelValue, (nuovoValore) => {
    dialogAperto.value = nuovoValore
    testoAnalisi.value = ''
  })

  watch(dialogAperto, (nuovoValore) => emit('update:modelValue', nuovoValore))

  async function analizzaConAI() {
    analisiInCorso.value = true
    testoAnalisi.value = await chiediAGemini(props.opera)
    analisiInCorso.value = false
  }

  return { dialogAperto, testoAnalisi, analisiInCorso, analizzaConAI }
}
<template>
  <v-dialog v-model="dialogAperto" max-width="780" scrollable>
    <v-card class="scheda-opera" rounded="xl">

      <div class="contenitore-immagine">
        <v-img :src="opera?.edmPreview?.[0]" height="320" cover>
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height bg-grey-darken-3">
              <v-icon size="64" color="grey">mdi-image-off</v-icon>
            </div>
          </template>
        </v-img>
        <div class="barra-oro" />
      </div>

      <v-card-title class="titolo-opera px-6 pt-5">
        {{ opera?.title?.[0] || 'Opera senza titolo' }}
      </v-card-title>

      <v-card-subtitle class="px-6 pb-2 sottotitolo-opera">
        <v-icon size="14" class="mr-1">mdi-account-outline</v-icon>
        {{ opera?.dcCreator?.[0] || 'Autore sconosciuto' }}
        <span class="mx-2 text-grey">·</span>
        <v-icon size="14" class="mr-1">mdi-calendar-outline</v-icon>
        {{ opera?.year?.[0] || 'Data ignota' }}
      </v-card-subtitle>

      <v-divider class="divisore-oro mx-6" />

      <v-card-text class="px-6 pt-4">
        <div class="chips-meta mb-4">
          <v-chip v-if="opera?.country?.[0]" size="small" variant="tonal" color="amber-darken-2" class="mr-2">
            <v-icon start size="12">mdi-map-marker</v-icon>{{ opera.country[0] }}
          </v-chip>
          <v-chip v-if="opera?.dataProvider?.[0]" size="small" variant="tonal" color="blue-grey" class="mr-2">
            <v-icon start size="12">mdi-bank</v-icon>{{ opera.dataProvider[0] }}
          </v-chip>
        </div>

        <v-btn
          :loading="analisiInCorso"
          variant="outlined"
          color="amber-darken-1"
          size="small"
          rounded="pill"
          prepend-icon="mdi-creation"
          class="mb-4"
          @click="analizzaConAI"
        >
          Analizza con AI
        </v-btn>

        <v-expand-transition>
          <div v-if="testoAnalisi" class="riquadro-ai pa-4 mt-2">
            <div class="etichetta-ai mb-2">
              <v-icon size="14" color="amber-darken-1" class="mr-1">mdi-creation</v-icon>
              <span class="text-caption text-amber-darken-1 font-weight-bold">ANALISI GEMINI</span>
            </div>
            <p class="testo-ai">{{ testoAnalisi }}</p>
          </div>
        </v-expand-transition>
      </v-card-text>

      <v-card-actions class="px-6 pb-5">
        <v-spacer />
        <v-btn variant="text" color="grey" @click="dialogAperto = false">Chiudi</v-btn>
        <v-btn
          v-if="opera?.guid"
          :href="opera.guid"
          target="_blank"
          variant="flat"
          color="amber-darken-2"
          rounded="pill"
          size="small"
        >
          Vedi su Europeana
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script setup>
import { usaMuseoGL } from '@/scripts/museoGL.js'

const props = defineProps({ modelValue: Boolean, opera: Object })
const emit = defineEmits(['update:modelValue'])

const { dialogAperto, testoAnalisi, analisiInCorso, analizzaConAI } = usaMuseoGL(props, emit)
</script>

<style scoped src="@/assets/museoGL.css" />
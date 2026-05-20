<template>
  <v-app theme="dark" class="app-museo">

    <section class="sezione-hero">
      <div class="sfondo-hero" />
      <v-container class="contenuto-hero text-center py-16">
        <p class="occhiello mb-3">MUSEO LICINI · EUROPEANA</p>
        <h1 class="titolo-hero mb-4">Scopri l'Arte<br>Europea</h1>
        <p class="sottotitolo-hero mb-10">
          Cerca tra milioni di opere nei musei d'Europa.<br>
          Lascia che l'AI ti racconti ogni capolavoro.
        </p>

        <v-form class="modulo-ricerca mx-auto" @submit.prevent="avviaRicerca(1)">
          <v-text-field
            v-model="testoRicerca"
            placeholder="Es: Monet, Rinascimento, paesaggio..."
            variant="solo"
            rounded="pill"
            bg-color="#2a2418"
            color="amber-darken-1"
            hide-details
            class="campo-ricerca"
          >
            <template #append-inner>
              <v-btn
                icon="mdi-magnify"
                variant="flat"
                color="amber-darken-2"
                size="small"
                rounded="circle"
                :loading="ricercaInCorso"
                @click="avviaRicerca(1)"
              />
            </template>
          </v-text-field>
        </v-form>

        <div class="riga-suggerimenti mt-6">
          <v-chip
            v-for="suggerimento in listaSuggerimenti"
            :key="suggerimento"
            size="small"
            variant="outlined"
            color="amber-darken-2"
            class="ma-1 chip-suggerimento"
            @click="selezionaSuggerimento(suggerimento)"
          >
            {{ suggerimento }}
          </v-chip>
        </div>
      </v-container>
    </section>

    <v-container v-if="listaOpere.length" class="pb-16">
      <div class="intestazione-risultati d-flex align-center justify-space-between mb-8">
        <div>
          <p class="etichetta-risultati">RISULTATI PER</p>
          <h2 class="testo-ultima-ricerca">"{{ ultimaRicerca }}"</h2>
        </div>
        <v-chip variant="tonal" color="amber-darken-2">{{ listaOpere.length }} opere</v-chip>
      </div>

      <v-row>
        <v-col
          v-for="opera in listaOpere"
          :key="opera.id"
          cols="12" sm="6" md="4" lg="3"
        >
          <v-card class="scheda-card" rounded="xl" :ripple="false" @click="apriScheda(opera)">
            <div class="contenitore-foto">
              <v-img :src="opera.edmPreview?.[0]" aspect-ratio="1" cover class="foto-opera">
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height bg-grey-darken-4">
                    <v-icon color="grey-darken-1" size="40">mdi-image-frame</v-icon>
                  </div>
                </template>
              </v-img>
              <div class="overlay-foto">
                <v-icon color="white" size="28">mdi-eye-outline</v-icon>
              </div>
            </div>
            <v-card-text class="pa-4">
              <p class="nome-opera">{{ opera.title?.[0] || 'Senza titolo' }}</p>
              <p class="nome-autore">{{ opera.dcCreator?.[0] || opera.dataProvider?.[0] || '—' }}</p>
              <div class="d-flex align-center justify-space-between mt-3">
                <span class="anno-opera">{{ opera.year?.[0] || '' }}</span>
                <v-chip size="x-small" color="amber-darken-3" variant="tonal">
                  {{ opera.country?.[0] || 'Europa' }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center mt-12">
        <v-btn
          v-if="numeroPagina > 1"
          variant="outlined"
          color="amber-darken-2"
          rounded="pill"
          class="mx-2"
          @click="avviaRicerca(numeroPagina - 1)"
        >← Precedente</v-btn>
        <v-btn
          variant="flat"
          color="amber-darken-2"
          rounded="pill"
          class="mx-2"
          @click="avviaRicerca(numeroPagina + 1)"
        >Successiva →</v-btn>
      </div>
    </v-container>

    <div v-if="!listaOpere.length && !ricercaInCorso" class="stato-vuoto text-center py-16">
      <v-icon size="64" color="grey-darken-2" class="mb-4">mdi-palette-outline</v-icon>
      <p class="text-grey">Cerca un'opera, un artista o un movimento artistico</p>
    </div>

    <MuseoGL v-model="schedaAperta" :opera="operaAttiva" />

  </v-app>
</template>

<script setup>
import MuseoGL from '@/components/MuseoGL.vue'
import { usaHomeView } from '@/scripts/homeView.js'

const {
  testoRicerca, ultimaRicerca, listaOpere,
  ricercaInCorso, numeroPagina, schedaAperta,
  operaAttiva, listaSuggerimenti,
  avviaRicerca, selezionaSuggerimento, apriScheda
} = usaHomeView()
</script>

<style scoped src="@/assets/homeView.css" />
export const ssr = false

import { browser } from '$app/environment'
import { redirect } from '@sveltejs/kit'

export async function load() {

  let username = ""

  if (browser) {
    username = localStorage.getItem("username") ?? ""
  }

  if (!username) {
    throw redirect(302, '/Login')
  }

}

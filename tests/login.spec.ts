import { test, expect } from '@playwright/test';

import { Account, Login } from './support/actions/login'

let login: Login

test.beforeEach(({ page }) => {
  login = new Login(page)
})

test('Deve logar com sucesso', async ({ page }) => {
  const account: Account = {
    username: "qa",
    password: 'xperience'
  }
  await login.submit(account)


  await expect(await login.getPopupContent()).toContainText('Suas credenciais são válidas :)');
});

test('Não deve logar com senha inválida', async ({ page }) => {
  const account: Account = {
    username: 'qa',
    password: 'abc'
  }

  await login.submit(account)
  await login.assertToast('Oops! Credenciais inválidas :(')
});

test('Não deve logar quando não informo o usuário', async ({ page }) => {
  const account: Account = {
    username: '',
    password: 'abc'
  }

  await login.submit(account)
  await login.assertToast('Informe o seu nome de usuário!')
});

test('Não deve logar quando não informo a senha', async ({ page }) => {
  const account: Account = {
    username: 'qa',
    password: ''
  }

  await login.submit(account)
  await login.assertToast('Informe a sua senha secreta!')
});

test('Não deve logar quando não preenche email e senha', async ({ page }) => {
  const account: Account = {
    username: '',
    password: ''
  }

  await login.submit(account)
  await login.assertToast('Informe o seu nome de usuário!')
});
const messages = {
  unauthorized: 'Você não tem permissão para acessar essa página',
  user: {
    notCreated: 'Não foi possível fazer o cadastro do novo usuario',
    notLogged: 'Não foi possível logar o usuario',
    forgetFailed: 'Não foi possível recuperar esse usuario, verifique se o email está correto.',
    resetFailed: 'Não foi possível resetar a senha desse usuario, verifique se os dados passados estão corretos.',
    confirmFailed: 'Não foi possível confirmar o usuario, verifique se o token é valido.',
  },
  image: {
    uploadFailed: 'Ocorreu um erro na hora de fazer o seu upload, tenta novamente mais tarde',
  },
};

module.exports = messages;

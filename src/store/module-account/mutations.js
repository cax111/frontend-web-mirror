export function setToken(state, data) {
  state.access_token = data.access_token;
  state.refresh_token = data.refresh_token;
}
export function clearToken(state) {
  state.access_token = null;
  state.refresh_token = null;
}
export function mutateUserLoad(state, data) {
  state.userLoad = data;
}

export function mutateHome(state, data) {
  state.home = data;
}

export function mutateUserProfile(state, data) {
  state.userProfile = data;
}

export function mutateLessons(state, data) {
  state.lessons = data;
}

export function mutateRequest(state, data) {
  state.request = data;
}

export function mutateQuestions(state, data) {
  state.questions = data;
}

export function mutateQuestionsLoad(state, data) {
  state.questionsLoad = data;
}

export function mutateQuestionsMore(state, data) {
  state.questions = state.questions.concat(data);
}

export function mutateQuestionsCurrentPage(state, data) {
  state.questionsCurrentPage = data;
}

export function mutateQuestionsLastPage(state, data) {
  state.questionsLastPage = data;
}

export function mutateTryoutExplainZoom(state, data) {
  state.tryout_explain_zoom = data;
}

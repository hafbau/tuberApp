// import actions from '../actions';

const initialState = {
  user: undefined,
  page: 'home',
  tutors: [],
  error: '',
  message: '',
  content: '',
  authenticated: false
};

const tuberApp = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_HOME_REJECTED':
      console.log(action.payload);
      return state;

    case 'LOAD_HOME_PENDING':
      return Object.assign({}, state, {
        tutors: [],
        status: 'FETCHING..'
      });

    case 'LOAD_HOME_FULFILLED':
      return {
        ...state,
        tutors: action.payload.data,
        status: 'FETCHED'
      };

    case 'REGISTER_TUTOR':
      return Object.assign({}, state, {
        page: 'register_tutor'
      });

    case 'SHOW_HOME':
      return Object.assign({}, state, {
        tutors: action.payload.tutors,
        status: 'FETCHED'
      });

    case 'REGISTER_STUDENT':
      return Object.assign({}, state, {
        page: 'register_student'
      });

    case 'AUTH_USER':
      return { ...state, error: '', message: '', authenticated: true, page: 'home' };

    case 'UNAUTH_USER':
      return { ...state, authenticated: false };

    case 'AUTH_ERROR':
      return { ...state, error: action.payload };

    case 'PROTECTED_TEST':
      return { ...state, content: action.payload };

    case 'LOG_IN':
      return Object.assign({}, state, {
        page: 'login'
      });

    default:
      return state;
  }
};

export default tuberApp;
import axios from 'axios';
import Qs from 'qs';
import Vue from 'vue';


const optionsForJson = {
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

const optionsForToken = {
  headers: {
    access_token: localStorage.getItem('access_token'),
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  transformRequest: [data => Qs.stringify(data, { arrayFormat: 'brackets' })],
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
};

const optionsForNoToken = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  transformRequest: [data => Qs.stringify(data, { arrayFormat: 'brackets' })],
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
};

const ajax = {
  axiosJson: axios.create(optionsForJson),
  axiosTokenL: axios.create(optionsForToken),
  axiosTokenNo: axios.create(optionsForNoToken),
};

/* 请求拦截请求 设置token */
ajax.axiosTokenL.interceptors.request.use((config) => {
  if (localStorage.getItem('access_token')) {
    config.headers.access_token = localStorage.getItem('access_token'); //eslint-disable-line
  }
  return config;
});
ajax.axiosTokenL.interceptors.response.use(config => config);
ajax.axiosJson.interceptors.request.use((config) => {
  if (localStorage.getItem('access_token')) {
    config.headers.access_token = localStorage.getItem('access_token'); //eslint-disable-line
  }
  return config;
});
ajax.axiosJson.interceptors.response.use(config => config);

// 响应拦截，给出异常提示
ajax.axiosTokenL.interceptors.response.use((config) => {
  const source = config.data;
  if ([40001, 40002, 40003].indexOf(source.status) !== -1) {
    return Vue.$alert('请重新登录', '提示', {
      confirmButtonText: '确定',
      callback: (action) => {
        // TODO 跳转到登录
        console.log(action);
      },
    });
  } else if (source.status !== 200) {
    return Vue.$confirm(source.msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
  }
  return config;
});

ajax.axiosJson.interceptors.response.use((config) => {
  const source = config.data;
  if ([40001, 40002, 40003].indexOf(source.status) !== -1) {
    return Vue.$alert('请重新登录', '提示', {
      confirmButtonText: '确定',
      callback: (action) => {
        // TODO 跳转到登录
        console.log(action);
      },
    });
  } else if (source.status !== 200) {
    return Vue.$confirm(source.msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
  }
  return config;
});

/**
 * GET  带token  表单
 */
function getAndToken(path, params) {
  return new Promise((resolve, reject) => {
    ajax.axiosTokenL.get(path, { params }).then((res) => {
      if (res && res.data.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  }).catch((err) => {
    window.console.error(`vue: ${err}`);
  });
}

/**
 * POST  带token  表单
 */
function postAndToken(path, params) {
  return new Promise((resolve, reject) => {
    ajax.axiosTokenL.post(path, params).then((res) => {
      if (res && res.data.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  }).catch((err) => {
    window.console.error(`vue: ${err}`);
  });
}

/**
 * POST  不带token  表单
 */
function postAndTokenNo(path, params) {
  return new Promise((resolve, reject) => {
    ajax.axiosTokenNo.post(path, params).then((res) => {
      if (res && res.data.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  }).catch((err) => {
    window.console.error(`vue: ${err}`);
  });
}

/**
 * POST  json
 */
function postAndJson(path, params) {
  return new Promise((resolve, reject) => {
    ajax.axiosJson.post(path, params).then((res) => {
      if (res && res.data.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  }).catch((err) => {
    window.console.error(`vue: ${err}`);
  });
}


/**
 * get json
 * @param path
 * @param params
 * @returns {Promise<any | never>}
 */
function getAndJson(path, params) {
  return new Promise((resolve, reject) => {
    ajax.axiosJson.get(path, { params }).then((res) => {
      if (res && res.data.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  }).catch((err) => {
    window.console.error(`vue: ${err}`);
  });
}


export default {
  getAndToken,
  postAndToken,
  postAndJson,
  postAndTokenNo,
  getAndJson,
  ajax,
};

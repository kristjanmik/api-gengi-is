import express from 'express';
import search from '../endpoints/search';

let router = express.Router();

let docs = {
  path: '/search/:term',
  responseWithoutParams: 'Empty list',
  params: {
    term: {
      required: true,
      description: 'String value, search term to match with available currency objects',
      response: 'List of matching currencies, if any',
    }
  },
};

router.get('/:term?', (req, res) => {
  // Decode search term to make sure special characters work
  let term = decodeURIComponent(req.params.term);
  search(term, (err, results) => {
    res.send(err ? err : results);
  });
});

export default {
  name: 'search',
  router,
  docs,
};

import axios from 'axios';
import Posts from '../models/postModels.js';

export const addPosts = async (req, res, next) => {
  const lang = 'en-us';
  const input = req.query.search;
  // Calling the Oxforddictionaries through axios.
  const options = axios.create({
    baseURL: 'https://od-api.oxforddictionaries.com',
    headers: {
      Accept: 'application/json',
      app_id: process.env.APP_ID,
      app_key: process.env.APP_KEY,
    },
  });
  // Checking weather search term is existing or not.
  const existingSearch = await Posts.findOne({ searchTerm: input });
  if (existingSearch) {
    return res.status(400).json(`Search already exists with this Input: ${input}`);
  } else {
    try {
      // Searching the Oxford dictionary
      options
        .get(`/api/v2/entries/${lang}/${input}`)
        .then(result => {
          var value = result.data.results[0].lexicalEntries.map(val => val);
          var grammar = result.data.results[0].lexicalEntries.map(val => val.lexicalCategory.text);
          grammar = grammar[0];
          var emp = value.map(val => val.entries);
          var searchTerm = result.data.results[0].lexicalEntries.map(val => val.text);
          searchTerm = searchTerm[0];
          var lang = result.data.results[0].lexicalEntries.map(val => val.language);
          lang = lang[0];
          var sense = emp.map(sen => sen[0].senses);
          var pronunciations = emp.map(sen => sen[0].etymologies);
          pronunciations = [undefined] ? null : (pronunciations = pronunciations[0][0]);
          var def = sense.map(def => def[0].definitions[0]);
          var shortDef = sense.map(def => def[0].shortDefinitions[0]);

          // Saving the data
          const data = {
            searchTerm,
            definitions: def,
            shortDef,
            speech: grammar,
            language: lang,
            pronunciations,
          };
          // Saving the data in the database.
          new Posts(data).save();
          res.status(201).send(data);
        })
        .catch(err => {
          res.status(404).send(err);
          console.error(err);
        });
    } catch (err) {
      res.status(404).send(err);
      console.error(err);
    }
  }
};

export const getPosts = async (req, res) => {
  // Fetching all posts.
  try {
    const posts = await Posts.find({});
    res.status(201).send(posts);
  } catch (error) {
    console.log(error);
    res.status(404).send(`Some thing went wrong in fetching posts ${error}`);
  }
};

export const getPostByName = async (req, res) => {
  // Fetching Single post from database.
  try {
    const find = req.params.id;
    const post = await Posts.findOne({ searchTerm: find });
    res.status(201).send(post);
  } catch (error) {
    console.log(error);
    res.status(404).send(`Some thing went wrong in fetching posts ${error}`);
  }
};

export const searchByName = async (req, res) => {
  // Fetching Single post from database.
  try {
    const find = req.query.name;
    console.log('This is calling', find);
    const post = await Posts.find({ searchTerm: { $regex: find, $options: 'i' } });
    res.status(201).send(post);
  } catch (error) {
    console.log(error);
    res.status(404).send(`Some thing went wrong in fetching posts ${error}`);
  }
};

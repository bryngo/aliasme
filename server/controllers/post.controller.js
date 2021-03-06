import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.org || !req.body.post.redirectDomain || !req.body.post.customDomain || !req.body.post.customURL) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);
  // Let's sanitize inputs
  newPost.org = sanitizeHtml(newPost.org);
  newPost.redirectDomain = sanitizeHtml(newPost.redirectDomain);
  newPost.customDomain = sanitizeHtml(newPost.customDomain);
  newPost.customURL = sanitizeHtml(newPost.customURL);

  newPost.slug = slug(newPost.org.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Get a single post by org and custom domain
 * @param req
 * @param res
 */
export function getPostbyOrgDom(req, res) {
  Post.findOne({ org: req.params.org, customDomain: req.params.customDomain }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    post.remove(() => {
      res.status(200).end();
    });
  });
}

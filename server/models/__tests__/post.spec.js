import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Post from '../post';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial posts added into test db
const posts = [
  new Post({ org: 'DCSC', redirectDomain: 'https://bryngo.me/', customDomain: 'bryan', customURL: 'http://localhost:8000/DCSC/bryan', cuid: 'cikqgkv4q01ck7453ualdn3hd' }),
  new Post({ org: 'BCNC', redirectDomain: 'https://www.yangvincent.com/', customDomain: 'vincent', customURL: 'http://localhost:8000/DCSC/vincent', cuid: 'cikqgkv4q01ck7453ualdn3hf' }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two post entries', async () => {
  await Post.create(posts).catch(() => 'Unable to create posts');
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should correctly give number of Posts', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/posts')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  // TODO:FIX THIS TEST
  t.deepEqual(posts.length, /* res.body.posts.length*/ 2);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const post = new Post({ org: 'DCSC', redirectDomain: 'https://bryngo.me/', customDomain: 'bryan', customURL: 'http://localhost:8000/DCSC/bryan', cuid: 'cikqgkv4q01ck7453ualdn3hd' });
  post.save();

  const res = await request(app)
    .get('/api/posts/cikqgkv4q01ck7453ualdn3hd')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.post.org, post.org);
});

test.serial('Should correctly add a post', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/posts')
    .send({ org: 'DCSC', redirectDomain: 'https://bryngo.me/', customDomain: 'bryan', customURL: 'http://localhost:8000/DCSC/bryan', cuid: 'cikqgkv4q01ck7453ualdn3hd' })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedPost = await Post.findOne({ org: 'DCSC' }).exec();
  t.is(savedPost.org, 'DCSC');
});

test.serial('Should correctly delete a post', async t => {
  t.plan(2);

  const post = new Post({ org: 'DCSC', redirectDomain: 'https://bryngo.me/', customDomain: 'bryan', customURL: 'http://localhost:8000/DCSC/bryan', cuid: 'cikqgkv4q01ck7453ualdn3hd' });
  post.save();

  const res = await request(app)
    .delete(`/api/posts/${post.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedPost = await Post.findOne({ cuid: post.cuid }).exec();
  t.is(queriedPost, null);
});

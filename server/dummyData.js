import Post from './models/post';

export default function () {
  Post.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const post1 = new Post({ org: 'DCSC', slug: 'dcsc', redirectDomain: 'https://bryngo.me/', customDomain: 'bryan', customURL: 'http://localhost:8000/DCSC/bryan', cuid: 'cikqgkv4q01ck7453ualdn3hd' });
    const post2 = new Post({ org: 'BCNC', slug: 'bcnc', redirectDomain: 'https://www.yangvincent.com/', customDomain: 'vincent', customURL: 'http://localhost:8000/DCSC/vincent', cuid: 'cikqgkv4q01ck7453ualdn3hf' });

    Post.create([post1, post2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}

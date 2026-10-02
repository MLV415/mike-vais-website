import test from 'node:test';
import assert from 'node:assert/strict';
import { publicBookLinks } from './book-club-links.mjs';
import { BOOK_FORMS, verifyBookForm } from './book-club-forms.mjs';
const book = (externalLinks) => ({ recordId: 'TEST', externalLinks });
test('missing and unverified links leave no public filler', () => {
  assert.deepEqual(publicBookLinks(book([])), []);
  assert.deepEqual(publicBookLinks(book([{label:'Official author page',url:'https://author.example/book'}])), []);
});
test('verified author/book pages export compact labels and no internal notes', () => {
  const links=[{label:'Wikipedia',url:'https://en.wikipedia.org/wiki/Binti_(novella)'},{label:'Official author page',url:'https://author.example/book',public:true,publicLabel:'Author Site',verifiedDate:'2026-10-02',verificationNote:'Private research'}];
  assert.deepEqual(publicBookLinks(book(links)),[{label:links[0].label,url:links[0].url},{label:'Author Site',url:links[1].url}]);
});
test('generic publisher homepages and unsafe protocols are rejected', () => {
  for(const url of ['https://publisher.example/','https://publisher.example/?book=title']) assert.throws(()=>publicBookLinks(book([{label:'Publisher page',url,public:true,publicLabel:'Publisher Site'}])), /generic publisher homepage/);
  for(const url of ['http://author.example/book','javascript:alert(1)','https://user:password@author.example/book']) assert.throws(()=>publicBookLinks(book([{label:'Author page',url,public:true,publicLabel:'Author Site'}])), /HTTPS/);
});
test('duplicate URL references appear only once', () => {
  const link={label:'Book page',url:'https://author.example/book',public:true,publicLabel:'Author Site'};
  assert.equal(publicBookLinks(book([link,link])).length,1);
});

test('Wikipedia and Goodreads precede site links regardless of canonical order', () => {
  const links = [
    { label: 'Publisher page', url: 'https://publisher.example/book', public: true, publicLabel: 'Publisher Site' },
    { label: 'Goodreads', url: 'https://www.goodreads.com/book/show/1' },
    { label: 'Official author page', url: 'https://author.example/book', public: true, publicLabel: 'Author Site' },
    { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Book' },
  ];
  assert.deepEqual(publicBookLinks(book(links)).map(link => link.label), ['Wikipedia', 'Goodreads', 'Author Site', 'Publisher Site']);
  assert.throws(() => publicBookLinks(book([{ ...links[0], publicLabel: 'Publisher' }])), /invalid compact/);
});

test('form uses the controlled structural vocabulary, not audience/genre variants', () => {
  for (const form of BOOK_FORMS) assert.doesNotThrow(() => verifyBookForm({ recordId: 'TEST', form }));
  for (const form of ['Novella / short novel', 'Middle-grade / young-adult fantasy novel', 'Short story collection', '', null]) {
    assert.throws(() => verifyBookForm({ recordId: 'TEST', form }), /form must be one of/);
  }
});

const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

//'mongodb://localhost/playground'

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    authors: [authorSchema]
    // author: {
    //   type: authorSchema,
    //   required: true
    // }
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourses(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $set: {
        'author.name': 'John Smith'
      }
    }
  );
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

//createCourse('Node Course', new Author({ name: 'Shas' }));
//updateCourses('5ce7cf96a642bd1cbcb98148');
//listCourses();
//addAuthor('5ce7d374138a3d27335c47f0', new Author({ name: 'Amr' }));
removeAuthor('5ce7d374138a3d27335c47f0', '5ce7db693efa062f26a8dca0');
// createCourse('Node Course', [
//   new Author({ name: 'Shas' }),
//   new Author({ name: 'John' })
// ]);

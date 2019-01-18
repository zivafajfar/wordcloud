const text = `About once a week, Uncle Vernon looked over the top of his newspaper and shouted that Harry needed a haircut. Harry must have had more haircuts than the rest of the boys in his class put together, but it made no difference, his hair simply grew that way - all over the place.
Harry was frying eggs by the time Dudley arrived in the kitchen with his mother. Dudley looked a lot like Uncle Vernon. He had a large pink face, not much neck, small, watery blue eyes, and thick blond hair that lay smoothly on his thick, fat head. Aunt Petunia often said that Dudley looked like a baby angel - Harry often said that Dudley looked like a pig in a wig.
Harry put the plates of egg and bacon on the table, which was difficult as there wasn't much room. Dudley, meanwhile, was counting his presents. His face fell.
"Thirty-six," he said, looking up at his mother and father. "That's two less than last year."
"Darling, you haven't counted Auntie Marge's present, see, it's here under this big one from Mommy and Daddy."
"All right, thirty-seven then," said Dudley, going red in the face. Harry, who could see a huge Dudley tantrum coming on, began wolfing down his bacon as fast as possible in case Dudley turned the table over.
Aunt Petunia obviously scented danger, too, because she said quickly, "And we'll buy you another two presents while we're out today. How's that, popkin? Two more presents. Is that all right?"
Dudley thought for a moment. It looked like hard work. Finally he said slowly, "So I'll have thirty . . . thirty . . ."
"Thirty-nine, sweetums," said Aunt Petunia.
"Oh." Dudley sat down heavily and grabbed the nearest parcel. "All right then."
Uncle Vernon chuckled.
"Little tyke wants his money's worth, just like his father. 'Atta boy, Dudley!" He ruffled Dudley's hair.
At that moment the telephone rang and Aunt Petunia went to answer it while Harry and Uncle Vernon watched Dudley unwrap the racing bike, a video camera, a remote control airplane, sixteen new computer games, and a VCR. He was ripping the paper off a gold wristwatch when Aunt Petunia came back from the telephone looking both angry and worried.
"Bad news, Vernon," she said. "Mrs. Figg's broken her leg. She can't take him." She jerked her head in Harry's direction.
Dudley's mouth fell open in horror, but Harry's heart gave a leap. Every year on Dudley's birthday, his parents took him and a friend out for the day, to adventure parks, hamburger restaurants, or the movies. Every year, Harry was left behind with Mrs. Figg, a mad old lady who lived two streets away. Harry hated it there. The whole house smelled of cabbage and Mrs. Figg made him look at photographs of all the cats she'd ever owned.
"Now what?" said Aunt Petunia, looking furiously at Harry as though he'd planned this. Harry knew he ought to feel sorry that Mrs. Figg had broken her leg, but it wasn't easy when he reminded himself it would be a whole year before he had to look at Tibbles, Snowy, Mr. Paws, and Tufty again.
"We could phone Marge," Uncle Vernon suggested.
"Don't be silly, Vernon, she hates the boy."
The Dursleys often spoke about Harry like this, as though he wasn't there - or rather, as though he was something very nasty that couldn't understand them, like a slug.
"What about what's-her-name, your friend - Yvonne?"
"On vacation in Majorca," snapped Aunt Petunia.
"You could just leave me here," Harry put in hopefully (he'd be able to watch what he wanted on television for a change and maybe even have a go on Dudley's computer).
Aunt Petunia looked as though she'd just swallowed a lemon.
"And come back and find the house in ruins?" she snarled.`

const stop_words = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'could', 'would', 're', 've', 's', 'd', 'm', 'didn', 't'];

//add capitalized words to stop_words list
stop_words.forEach((e) => stop_words.push(e.charAt(0).toUpperCase() + e.slice(1)));

function create_word_cloud(num_of_words) {
  const count_obj = {};
  //clean the text and split it
  const text_split = text.split(/[\s']+/);
  const text_cleaned = text_split.join(" ").replace(/[\b\d+\b]|[^\w\s]/gi, '');
  const occurences = text_cleaned.split(/[\s]+/);

  //remove stop words
  const remove_stop_words = occurences.filter((e) => !stop_words.includes(e));

  //make an object with the the number of occurences for each word
  remove_stop_words.forEach((e) => (e in count_obj) ? count_obj[e] += 1 : count_obj[e] = 1);

  //turn object into list
  const count_list = Object.keys(count_obj).map((key) => [key, count_obj[key]]);
  //sort the list by the number of occurences (ascending)
  count_list.sort((a, b) => b[1] - a[1]);

  //number of all occurences
  const all_occ = count_list.length;

  //decide how many words you want to consider
  count_list_short = count_list.slice(0, num_of_words);

  //shuffle the list
  const shuffle_list = count_list_short.sort(() => 0.5 - Math.random());

  return shuffle_list;
}

function display_word_cloud() {
  for(el of create_word_cloud(45)) {
    const p = document.createElement("p");
    const t = document.createTextNode(el[0]);
    p.appendChild(t);
    document.querySelector(".wrapper").appendChild(p);
    if(el[1] === 1) {
      p.className = "item size1";
    } else if(el[1] === 2) {
      p.className = "item size2";
    } else if(el[1] === 3) {
      p.className = "item size3";
    } else if(el[1] === 4) {
      p.className = "item size4";
    } else if(el[1] === 5) {
      p.className = "item size5";
    } else if(el[1] === 6) {
      p.className = "item size6";
    } else if(el[1] === 7) {
      p.className = "item size7";
    } else if(el[1] === 8) {
      p.className = "item size8";
    } else if(el[1] === 9) {
      p.className = "item size9";
    } else {
      p.className = "item size10";
    }
  }
}

display_word_cloud()

const items = document.querySelectorAll(".item");
window.addEventListener('load', function() {
  Array.from(items).forEach(function(item) {
    item.classList.add("size_transition");
  })
});

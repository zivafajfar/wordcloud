function create_word_cloud(num_of_words) {
  const count_obj = {};
  //clean the text and split it
  const text_split = text.split(/[\s']+/);
  const text_cleaned = text_split.join(" ").replace(/[\b\d+\b]|[^\w\s]/gi, '');
  const occurrences = text_cleaned.split(/[\s]+/);

  //remove stop words
  const remove_stop_words = occurrences.filter((e) => !stop_words.includes(e));

  //make an object with each word as key and the number of occurrences as value
  remove_stop_words.forEach((e) => (e in count_obj) ? count_obj[e] += 1 : count_obj[e] = 1);

  //turn object into array
  const count_list = Object.keys(count_obj).map((key) => [key, count_obj[key]]);
  
  //sort the array by the number of occurrences in descending order
  count_list.sort((a, b) => b[1] - a[1]);

  //get the number of all occurrences
  const all_occ = count_list.length;

  //decide how many words you want to consider
  count_list_short = count_list.slice(0, num_of_words);

  //shuffle the list
  const shuffle_list = count_list_short.sort(() => 0.5 - Math.random());

  return shuffle_list;
}

//
function display_word_cloud() {
  //place every word in its paragraph and append them to wrapper
  for(el of create_word_cloud(50)) {
    const p = document.createElement("p");
    const t = document.createTextNode(el[0]);
    p.appendChild(t);
    document.querySelector(".wrapper").appendChild(p);
    //add classes according to the number of occurrences
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

//set transitions on load
const items = document.querySelectorAll(".item");
window.addEventListener('load', function() {
  Array.from(items).forEach(function(item) {
    item.classList.add("size_transition");
  })
});

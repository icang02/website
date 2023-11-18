export const addClass = (content) => {
  content
    .replaceAll("<h1>", '<h1 class="h1">')
    .replaceAll("<h2>", '<h2 class="h2">')
    .replaceAll("<h3>", '<h3 class="h3">')
    .replaceAll("<h4>", '<h4 class="h4">')
    .replaceAll("<p>", '<p class="p">')
    .replaceAll("<ul>", '<ul class="ul">')
    .replaceAll("<ol>", '<ol class="ol">')
    .replaceAll("<li>", '<li class="li">')
    .replaceAll("<img>", '<img class="img">');
};

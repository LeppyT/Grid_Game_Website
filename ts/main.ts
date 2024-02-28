enum block_type
{
    blank,
    green,
    red,
    blue_green,
    blue_red
}
class Block
{
    pos: number;
    type: block_type;
    block: HTMLElement;
}
class Grid
{
    grid: HTMLElement;
    full_grid: Array<Block>;
    blanks: Array<Block>;
    reds: Array<Block>;
    blue_greens: Array<Block>;
}
function add_blues()
{
    let range: number = global_grid.blanks.length - 1;
    if(range<1)
        return false;
    let blank = Math.floor(Math.random()*range);
    let pos_red = global_grid.blanks[blank].pos;
    global_grid.full_grid[pos_red].block.className = "blue_square";
    global_grid.full_grid[pos_red].type = block_type.blue_red;
    global_grid.full_grid[pos_red].block.onclick = () =>{click_blue_red(pos_red)};
    global_grid.blanks.splice(blank,1);
    blank = Math.floor(Math.random()*(range-1));
    let pos = global_grid.blanks[blank].pos;
    global_grid.full_grid[pos].block.className = "blue_square";
    global_grid.full_grid[pos].type = block_type.blue_green;
    global_grid.full_grid[pos].block.onclick = () =>{click_blue_green(pos)};
    global_grid.blue_greens.push(global_grid.full_grid[pos]);
    global_grid.blanks.splice(blank,1);
    return true;
}

function generate_grid(grid: HTMLElement)
{
    let i = 0;
    const output: Grid = new Grid();
    output.grid = grid;
    output.full_grid = new Array<Block>();
    output.blanks = new Array<Block>();
    output.blue_greens = new Array<Block>();
    output.reds = new Array<Block>();
    for(i=0;i<40;i++)
    {
        let block_element: HTMLElement = document.createElement("div");
        block_element.className = "blank_square";
        const block: Block = new Block();
        block.block = block_element;
        block.type = block_type.blank;
        block.pos = i;
        output.full_grid.push(block);
        output.grid.appendChild(block.block);
        output.blanks.push(block);
    }
    

    return output;

}
function restart()
{
    global_grid.grid.innerHTML= "";
    global_grid.full_grid = [];
    global_grid.blanks = [];
    global_grid.reds = [];
    global_grid.blue_greens = [];
    global_grid = generate_grid(document.getElementById("game_grid")!);
}
function zap()
{
    if(zap_amount==0)
        return;
    let len = global_grid.reds.length-1;
    if(len==0)
        return;
    let red = Math.floor(Math.random()*len);
    let pos = global_grid.reds[red].pos;
    global_grid.full_grid[pos].block.className = "blank_square";
    global_grid.full_grid[pos].type = block_type.blank;
    global_grid.blanks.push(global_grid.full_grid[pos]);
    global_grid.reds.splice(red,1);
    zap_amount--;
    let amount = document.getElementById("zap_amount")!;
    amount.innerHTML = zap_amount.toString();
}
function find()
{
    if(find_amount==0)
        return;
    let len = global_grid.blue_greens.length-1;
    if(len==0)
        return;
    let blue = Math.floor(Math.random()*len);
    let pos = global_grid.blue_greens[blue].pos;
    global_grid.full_grid[pos].block.className = "green_square";
    global_grid.full_grid[pos].type = block_type.green;
    global_grid.full_grid[pos].block.onclick = () => {click_green(pos);};
    global_grid.blanks.push(global_grid.full_grid[pos]);
    global_grid.blue_greens.splice(blue,1);
    find_amount--;
    let amount = document.getElementById("find_amount")!;
    amount.innerHTML = find_amount.toString();
}
function click_blue_red(pos: number)
{
    global_grid.full_grid[pos].block.className = "red_square";
    global_grid.full_grid[pos].type = block_type.red;
    global_grid.full_grid[pos].block.onclick = () => {};
    global_grid.reds.push(global_grid.full_grid[pos]);
}
function click_blue_green(pos: number)
{
    let current_score = document.getElementById("score")!;
    score++;
    current_score.innerHTML = score.toString();
    if(score%5 == 0)
    {
        let power = Math.floor(Math.random()*2);
        if(power == 0)
        {
            zap_amount++;
            let zap_element = document.getElementById("zap_amount")!;
            zap_element.innerHTML = zap_amount.toString();
        }
        else
        {
            find_amount++;
            let find_element = document.getElementById("find_amount")!;
            find_element.innerHTML = find_amount.toString();
        }
    }
    global_grid.full_grid[pos].block.className = "blank_square";
    global_grid.full_grid[pos].type = block_type.blank;
    global_grid.full_grid[pos].block.onclick = () => {};
    global_grid.blanks.push(global_grid.full_grid[pos]);
    if(add_blues())
        return;
    else
    {
        global_grid.grid.innerHTML = "<p>Game Over, you scored " + score + " points.<br>" + "High Score is " + high_score + ".</p>";
        if(score>high_score)
        {
            setCookie("high_score", score.toString(), 365);
            hs_text.innerHTML = high_score.toString();
        }
    }
}
function click_green(pos: number)
{
    let current_score = document.getElementById("score")!;
    score++;
    current_score.innerHTML = score.toString();
    if(score%5 == 0)
    {
        let power = Math.floor(Math.random()*2);
        if(power == 0)
        {
            zap_amount++;
            let zap_element = document.getElementById("zap_amount")!;
            zap_element.innerHTML = zap_amount.toString();
        }
        else
        {
            find_amount++;
            let find_element = document.getElementById("find_amount")!;
            find_element.innerHTML = find_amount.toString();
        }
    }
    global_grid.full_grid[pos].block.className = "blank_square";
    global_grid.full_grid[pos].type = block_type.blank;
    global_grid.full_grid[pos].block.onclick = () => {};
    global_grid.blanks.push(global_grid.full_grid[pos]);
    if(add_blues())
        return;
    else
    {
        global_grid.grid.innerHTML = "<p>Game Over, you scored " + score + " points.<br>" + "High Score is " + high_score + ".</p>";
        if(score>high_score)
        {
            setCookie("high_score", score.toString(), 365);
            hs_text.innerHTML = high_score.toString();
        }
    }
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
let score = 0;
let high_score = 0;
let zap_amount = 0;
let find_amount = 0;
let hs_text;
let cookie = getCookie("high_score");
if(cookie == "")
{
    setCookie("high_score", "0", 365);
}
else
{
    high_score = parseInt(cookie);
    hs_text = document.getElementById("highscore")!;
    hs_text.innerHTML = high_score.toString();
}
let element = document.getElementById("game_grid")!;
let global_grid = generate_grid(element);
add_blues();
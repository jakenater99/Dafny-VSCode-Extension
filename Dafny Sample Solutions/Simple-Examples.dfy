method example(a: int, b: int) returns (x: int, y: int)
    requires a > 0 && b > 0
    ensures x == 3 && y == 3
{   
    // asd{ x == 1 }
    //{x == 1}
    var wpp := 0;
    wpp := 1;
    var c := true;
    x,y := a,b;
    assert(x >= 0 && c ==> true);
    assert(x >= -10);
    assert(x + 1 >= -10);
    x := x + 1;
    //assert y == 10;
    //y := 0;
    //x := 6;
    assert(x >= -10);
}

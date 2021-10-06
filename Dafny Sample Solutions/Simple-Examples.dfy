
method example(a: int, b: int) 
{
    var c := true;
    var x,y := a,b;
    assert(x >= 0 && c ==> true);
    assert(x >= -10);
    assert(x + 1 >= -10);
    x := x + 1;
    assert y == 1;
    y := 0;
    x := 6;
    assert(x >= -10);
}


method example(a: int, b: int) 
{
    var c := true;
    var x,y := a,b;
    assert(x >= 0 && c ==> true);
    assert(x >= -11);
    assert(x + 1 >= -10);
    x := x + 1;
    assert(x >= -10);
    assert y == 1;
    y := 0;
    assert(x >= -10);
    print x,y;
    wpp
}

/*
method Main() {
    example(1,1);
}
*/
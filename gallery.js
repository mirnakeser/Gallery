

$(document).ready( function() 
{
    $( '.gallery' ).hide();

    var gallery = $( '.gallery' );

    for (var i = 0; i < gallery.length; ++i)
    {
        var elem = gallery.eq(i);
        var div = $( '<div>' );
        var naslov = elem.attr('title');
        div.html(naslov);
        
        var button = $( '<button>Pogledaj galeriju!</button>' );
        div.append(button);

        div.insertAfter(elem);
    }

    $( 'button' ).on( 'click', function()
    {
        var pravokutnik = $( '<div>' );
        pravokutnik
            .css( 'position', 'absolute' )
            .css( 'left', '10%')
            .css( 'top', '10%')
            .css( 'width', '80%')
            .css( 'height', '80%')
            .css('background-color', 'coral');
            
                
        var x = $( '<button id="x">X</button>' );
        x.css('background-color', 'red' )
            .css( 'position', 'absolute' )
            .css( 'top', '0')
            .css('right', '0')
            .css('height', '50px')
            .css('width', '50px')
            .css('color', 'white');
        pravokutnik.append(x);

        var nazad = $( '<button><<</button>' );
        nazad.css('background-color', 'grey' )
            .css( 'position', 'absolute' )
            .css( 'bottom', '0')
            .css('left', '0')
            .css('height', '50px')
            .css('width', '50px')
            .css('color', 'white');
        pravokutnik.append(nazad);

        var naprijed = $( '<button>>></button>' );
        naprijed.css('background-color', 'grey' )
            .css( 'position', 'absolute' )
            .css( 'bottom', '0')
            .css('right', '0')
            .css('height', '50px')
            .css('width', '50px')
            .css('color', 'white');
        pravokutnik.append(naprijed);

        $( 'body' ).append( pravokutnik );
        pravokutnik.show();

        var slika = $('<img>');
        var index = 0;
        var opis = $('<p>');
        var slike = $(this).parent().prev().children('img');
        var opisi = $(this).parent().prev().children('p');
        var visinaDiva = pravokutnik.height();
        var sirinaDiva = pravokutnik.width();
        var sirina = slika.prop('naturalWidth');
        var visina = slika. prop('naturalHeight');
        var omjer_slika = sirina/visina;
        
        slika
            .attr('src', slike.first().attr("src"))
            .css('display', 'block')
            //.css('object-fit', 'none')
            //.css('align-self', 'center')
            .css('margin', 'auto');

            if ( visinaDiva > sirinaDiva )
            {
                slika.css('width', 0.8 * sirinaDiva);
                visina =  0.7 * visinaDiva / omjer_slika;
                slika.css('height', visina);
            }
            else
            {
                slika.css('height',  0.8 * visinaDiva );
                sirina = 0.8 * sirinaDiva * omjer_slika;
                slika.css('width', sirina);
            }

        if (slika !== slike.last())
            naprijed.css('background-color', 'green');
          
        
        opis.html('Slika ' + (index+1) + '/' + slike.length + '<br>');

        for ( var i = 0; i < opisi.length; i++)
        {
            var o = opisi.eq( i ); 
            if ( o.attr('data-target') === slika.attr('src') )
                opis.html(opis.html() + o.html());
        }
        opis
            .css('position', 'absolute')
            .css('width', '100%')
            .css('text-align', 'center');
            
                    
        pravokutnik.append(slika);
        pravokutnik.append(opis);

            
        x.on( 'click', function()
        {
            pravokutnik.hide();
        });

            
        naprijed.on( 'click', function()
        {
            if ( index !== slike.length-1 )
            {
                index++;
                
                slika.attr('src', slike.eq(index).attr("src"));
                opis.html('Slika ' + (index+1) + '/' + slike.length + '<br>');
                for ( var i = 0; i < opisi.length; i++)
                { 
                    var o = opisi.eq( i ); 
                    if ( o.attr('data-target') === slika.attr('src') )
                        opis.html(opis.html() + o.html());
                }


                if ( index === slike.length-1 )
                    naprijed.css('background-color', 'grey');
                if ( index !== 0 )
                    nazad.css( 'background-color', 'green' );
            }
        });

        nazad.on('click', function()
        {
            if ( index !== 0 )
            {
                index--;
                
                opis.html('Slika ' + (index+1) + '/' + slike.length + '<br>');
                slika.attr('src', slike.eq(index).attr("src"));
                for ( var i = 0; i < opisi.length; i++)
                { 
                    var o = opisi.eq( i ); 
                    if ( o.attr('data-target') === slika.attr('src') )
                        opis.html(opis.html() + o.html());
                }

                if ( index !== slike.length-1 )
                    naprijed.css('background-color', 'green');
                if ( index === 0 )
                    nazad.css( 'background-color', 'grey' );
            }
        });
      });  

} ) ;
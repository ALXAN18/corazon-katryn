document.addEventListener("DOMContentLoaded", () => {
  // ==================== FRASES COMPLETAS ====================
  const frasesRomanticas = [
    "Katryn, eres la mujer más hermosa de mi universo",
    "Cada latido de mi corazón lleva tu nombre",
    "Tu sonrisa ilumina mis días más oscuros",
    "Eres mi sueño hecho realidad",
    "Amo la forma en que haces mi vida mejor",
    "Nunca dejé de sorprenderme por tu bondad",
    "Eres mi refugio seguro en este mundo",
    "Tu amor es el mejor regalo de mi vida",
    "Contigo encontré el verdadero significado del amor",
    "Eres mi razón para ser mejor cada día",
    "Tu mirada me hace perder la noción del tiempo",
    "Amo cada detalle de tu personalidad única",
    "Eres la dueña absoluta de mi corazón",
    "Cada día a tu lado es una bendición",
    "Tu ternura cura hasta mis peores días",
    "Eres perfecta en cada imperfección",
    "Amo cómo entendemos el mundo de la misma forma",
    "Tu inteligencia me fascina tanto como tu belleza",
    "Eres mi compañera de vida ideal",
    "Nada me hace más feliz que tu felicidad",
    "Tu voz es la melodía más hermosa que escuché",
    "Amo cómo me haces sentir amado cada día",
    "Eres mi fuerza cuando me siento débil",
    "Contigo hasta lo simple se vuelve especial",
    "Tu pasión por la vida me inspira",
    "Eres mi equilibrio en este mundo caótico",
    "Amo cómo me complementas perfectamente",
    "Tu honestidad es uno de tus mayores tesoros",
    "Eres la personificación de todo lo bueno",
    "Mi amor por ti crece más con cada amanecer",
    "Eres mi confidente y mejor amiga",
    "Amo cómo construimos nuestro propio mundo",
    "Tu presencia llena todos mis vacíos",
    "Eres mi motivación para todo lo que hago",
    "Amo nuestra complicidad única",
    "Tu calidez humana es extraordinaria",
    "Eres mi faro en la oscuridad",
    "Amo cómo me desafías a mejorar",
    "Tu sentido del humor combina perfecto con el mío",
    "Eres mi paz interior personificada",
    "Amo cómo me haces sentir completo",
    "Tu valentía me inspira profundamente",
    "Eres mi historia de amor favorita",
    "Amo cómo transformaste mi vida",
    "Tu esencia es pura magia",
    "Eres mi mayor logro en la vida",
    "Amo cada momento que compartimos",
    "Tu amor es mi mayor fortuna",
    "Eres mi eterno motivo de sonrisas",
    "Juntos somos invencibles",
    "Eres mi todo, hoy y siempre."
  ];

  const frasesMotivadoras = [
    "¡5 toques más mi amor! 💖",
    "¡Así se hace, princesa! 👑",
    "Eres increíble, sigue así 😍",
    "Cada toque acerca nuestro amor 💞",
    "¡Eres mi campeona! 🏆",
    "¡Vamos mi vida, tú puedes! 💪",
    "Eres pura magia en mi vida ✨",
    "¡Sigue mi reina hermosa! 🌹",
    "Nada detiene tu poder 💥",
    "Eres mi fuerza y motivación 💓"
  ];

  // ==================== VARIABLES GLOBALES ====================
  let indiceRomantica = 0;
  let indiceMotivadora = 0;
  let toquesCorazon = 0;
  let primeraVez = true;
  let juegoIniciado = false;
  let animacionesPausadas = true;
  let elementosAnimados = [];
  
  const mensajeElement = document.getElementById("mensaje");
  const motivadoraElement = document.getElementById("fraseMotivadora");
  const heartElement = document.querySelector(".heart");
  const audio = document.getElementById("latido");
  const controlBtn = document.getElementById("control");
  const contadorElement = document.getElementById("contador");
  const coloresFondo = ["#ffdde1", "#fae3e3", "#f0f4ff", "#e8f8f5", "#f9ebea"];

  // ==================== FUNCIONES DE INICIO ====================
  function generarFlotantes() {
    const contenedor = document.getElementById("flotantesFondo");
    contenedor.innerHTML = '';
    
    for (let i = 0; i < 25; i++) {
      const flotante = document.createElement("span");
      flotante.classList.add(Math.random() > 0.5 ? "corazon" : "estrella");
      flotante.style.left = `${Math.random() * 100}%`;
      flotante.style.animationDuration = `${Math.random() * 8 + 4}s`;
      contenedor.appendChild(flotante);
    }
    
    elementosAnimados = [
      ...document.querySelectorAll(".flotantes-fondo span"),
      document.querySelector(".rosa"),
      heartElement
    ];
  }

  // ==================== CONTROL PRINCIPAL ====================
  heartElement.addEventListener("click", () => {
    if (!juegoIniciado) {
      juegoIniciado = true;
      animacionesPausadas = false;
      audio.play();
      generarFlotantes();
      
      elementosAnimados.forEach(elemento => {
        elemento.style.animationPlayState = "running";
      });
      
      controlBtn.textContent = "Pausar";
      mensajeElement.textContent = frasesRomanticas[0];
      indiceRomantica = 1;
      toquesCorazon = 1;
      contadorElement.textContent = "Toques: 1/50";
      return;
    }

    if (animacionesPausadas) return;

    if (toquesCorazon >= 50) {
      reiniciar();
      return;
    }

    toquesCorazon++;
    contadorElement.textContent = `Toques: ${toquesCorazon}/50`;
    document.body.style.background = coloresFondo[toquesCorazon % coloresFondo.length];
    
    // Mostrar frases románticas
    mensajeElement.style.opacity = 0;
    setTimeout(() => {
      mensajeElement.textContent = frasesRomanticas[indiceRomantica];
      mensajeElement.style.opacity = 1;
      indiceRomantica = (indiceRomantica + 1) % frasesRomanticas.length;
    }, 300);

    // Mostrar frases motivadoras cada 5 toques
    if (toquesCorazon % 5 === 0) {
      motivadoraElement.style.opacity = 0;
      setTimeout(() => {
        motivadoraElement.textContent = frasesMotivadoras[indiceMotivadora];
        motivadoraElement.style.opacity = 1;
        indiceMotivadora = (indiceMotivadora + 1) % frasesMotivadoras.length;
      }, 300);
    }

    // Efecto de escala en el corazón
    heartElement.style.transform = "scale(1.15)";
    setTimeout(() => heartElement.style.transform = "scale(1)", 200);
  });

  // ==================== CONTROL DE PAUSA/REANUDAR ====================
  controlBtn.addEventListener("click", () => {
    if (!juegoIniciado) return;
    
    animacionesPausadas = !animacionesPausadas;
    
    elementosAnimados.forEach(elemento => {
      elemento.style.animationPlayState = animacionesPausadas ? "paused" : "running";
    });
    
    audio[animacionesPausadas ? "pause" : "play"]();
    controlBtn.textContent = animacionesPausadas ? "Reanudar" : "Pausar";
  });

  // ==================== FUNCIÓN DE REINICIO ====================
  function reiniciar() {
    juegoIniciado = false;
    primeraVez = true;
    toquesCorazon = 0;
    indiceRomantica = 0;
    indiceMotivadora = 0;
    animacionesPausadas = true;
    
    contadorElement.textContent = "Toques: 0/50";
    document.body.style.background = "#f3e7e9";
    audio.pause();
    audio.currentTime = 0;
    
    elementosAnimados.forEach(elemento => {
      elemento.style.animationPlayState = "paused";
    });
    
    mensajeElement.style.opacity = 0;
    setTimeout(() => {
      mensajeElement.textContent = "¡Toca el corazón mi vida! 💖";
      mensajeElement.style.opacity = 1;
    }, 300);
    
    motivadoraElement.textContent = "¡Sigue tocando el corazón! 💖";
    controlBtn.textContent = "Pausar";
    generarFlotantes();
  }

  // ==================== INICIALIZACIÓN ====================
  generarFlotantes();
  elementosAnimados.forEach(elemento => {
    elemento.style.animationPlayState = "paused";
  });

  // Controles de audio
  document.getElementById("adelantar").addEventListener("click", () => audio.currentTime += 10);
  document.getElementById("atrasar").addEventListener("click", () => audio.currentTime = Math.max(0, audio.currentTime - 10));
});
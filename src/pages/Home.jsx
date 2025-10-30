import HeroImage from "../assets/images/hero-image.jpg";

export default function Home() {
  return (
    <section className="h-screen bg-cafe-blanco">
      <div className="relative h-120 w-full overflow-hidden">
        <img
          src={HeroImage}
          alt="Mil Sabores"
          className="w-full h-full object-cover brightness-75"
        />
      </div>
      <div>
        <span className="text-4xl text-cafe-oscuro font-subtitulo flex justify-center items-center pt-8">
          Productos destacados
        </span>
      </div>
    </section>
  );
}

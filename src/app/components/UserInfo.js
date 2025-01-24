export default function UserInfo({ user }) {
    return (
      <div className="p-6">
        {user ? (
          <>
            <img
              src={user.image || "/default-avatar.png"}
              alt={user.name}
              className="w-16 h-16 rounded-full mx-auto"
            />
            <p className="text-center mt-2">Hola, {user.name}</p>
            <button className="mt-4 block mx-auto bg-white text-green-600 px-4 py-2 rounded-full">
              Cerrar sesión
            </button>
          </>
        ) : (
          <button className="mt-4 block mx-auto bg-white text-green-600 px-4 py-2 rounded-full">
            Iniciar sesión
          </button>
        )}
      </div>
    );
  }
  
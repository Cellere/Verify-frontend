
export default function NotFound() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-fixed bg-cover bg-bottom error-bg">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 text-center -mt-52">
              <div className="relative ">
                <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold text-gray-500">
                  <span>4</span><span>0</span><span>4</span></h1>
              </div>
              <p className="text-gray-500 mt-2 mb-6">Desculpe, mas a página não foi encontrada.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

import { Link } from "@inertiajs/react";

export default function Show({movie}) {
    // Extract YouTube video ID from URL
    const getYouTubeId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
        return match ? match[1] : null;
    };
    
    const videoId = getYouTubeId(movie.video_url);
    
    return (
        <section
            className="mx-auto w-screen relative h-screen watching-page font-poppins bg-black"
            id="stream"
        >
            <div className="pt-[100px] px-4">
                <div className="relative w-full h-[850px] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="mb-8">
                            <svg className="w-24 h-24 mx-auto text-red-600 mb-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{movie.name}</h2>
                        <p className="text-gray-400 mb-2 text-lg">Video tidak dapat dimuat di halaman ini</p>
                        <p className="text-gray-500 mb-8 text-sm">Karena pembatasan keamanan browser</p>
                        
                        <a 
                            href={movie.video_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors text-lg font-medium"
                        >
                            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            Tonton di YouTube
                        </a>
                        
                        <div className="mt-6 text-sm text-gray-500">
                            <p>Video ID: {videoId}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button back to dashboard */}
            <div className="absolute top-5 left-5 z-20">
                <Link href={route('user.dashboard.index')}>
                    <img
                        src="/icons/ic_arrow-left.svg"
                        className="transition-all btn-back w-[46px]"
                        alt="stream"
                    />
                </Link>
            </div>

            {/* Video Title */}
            <div className="absolute title-video top-7 left-1/2 -translate-x-1/2 max-w-[310px] md:max-w-[620px] text-center">
                <span className="font-medium text-2xl transition-all text-white drop-shadow-md select-none">
                    {movie.name || 'loading...'}
                </span>
            </div>
        </section>
    );
}
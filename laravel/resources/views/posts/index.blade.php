<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <h2 class="text-2xl font-semibold leading-tight text-base-content">
                {{ __('Posts') }}
            </h2>
            @auth
                <a href="{{ route('posts.create') }}" class="btn btn-primary">
                    {{ __('New Post') }}
                </a>
            @endauth
        </div>
    </x-slot>

    <div class="py-6">
        <div class="mx-auto max-w-5xl px-4">
            @if (session('status'))
                <div class="alert alert-success mb-4">
                    {{ session('status') }}
                </div>
            @endif

            @if ($posts->count())
                <div class="grid gap-4 lg:grid-cols-2">
                    @foreach ($posts as $post)
                        <article class="card bg-base-100 shadow">
                            <div class="card-body">
                                <h3 class="card-title">
                                    <a href="{{ route('posts.show', $post) }}" class="link link-hover">
                                        {{ $post->title }}
                                    </a>
                                </h3>
                                <p class="text-sm text-base-content/70">
                                    {{ __('By :name on :date', [
                                        'name' => $post->user->name ?? __('Unknown'),
                                        'date' => $post->created_at->format('M j, Y'),
                                    ]) }}
                                </p>
                                <p class="mt-3">{{ \Illuminate\Support\Str::limit($post->body, 180) }}</p>
                                <div class="card-actions justify-end">
                                    <a href="{{ route('posts.show', $post) }}" class="btn btn-outline btn-sm">
                                        {{ __('Read More') }}
                                    </a>
                                </div>
                            </div>
                        </article>
                    @endforeach
                </div>

                <div class="mt-8">
                    {{ $posts->links() }}
                </div>
            @else
                <div class="text-center">
                    <div class="alert alert-info">
                        {{ __('No posts yet. Sign in to create the first one!') }}
                    </div>
                </div>
            @endif
        </div>
    </div>
</x-app-layout>

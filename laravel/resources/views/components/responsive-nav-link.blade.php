@props(['active'])

@php
$classes = ($active ?? false)
            ? 'btn btn-ghost btn-active justify-start'
            : 'btn btn-ghost justify-start';
@endphp

<a {{ $attributes->merge(['class' => $classes . ' w-full font-medium']) }}>
    {{ $slot }}
</a>

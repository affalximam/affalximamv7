<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyReferer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
{
    $referer = $request->headers->get('referer');

    if (!$referer || !str_contains($referer, 'http://localhost:3000')) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    return $next($request);
}

}
